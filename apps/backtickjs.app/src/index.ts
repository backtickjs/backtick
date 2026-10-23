// The Vercel Function, where Vercel looks for it: the MCP endpoint the hosts
// connect to, as the default export.
import {
  createMcpHandler,
  getOAuthProtectedResourceMetadataUrl,
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
  type OAuthMetadata,
  oauthMetadataResponse,
  requireBearerAuth,
} from "@modelcontextprotocol/server";
import { type Context, Hono } from "hono";
import { html } from "hono/html";
import * as z from "zod";
import { ownerOf, verifier } from "./function/auth.ts";
import { bundleInSandbox, snapshotId } from "./function/sandbox.ts";
import { latestVersion } from "./function/store.ts";
import { tools } from "./function/tools.ts";
// Compiled by `tspc` first: the pages and the phone's screens are Backtick
// scripts.
import { consentPage, privacyPage } from "../web/dist/index.js";
import { app as home } from "../mobile/dist/index.js";

const mcp = createMcpHandler((context) => tools(ownerOf(context.authInfo)));

// This machine, the project's domains and the deployment's own hostnames: a
// page in the browser can't reach the endpoint by pointing another domain at
// it.
const hostnames = [
  ...localhostAllowedHostnames(),
  "backtickjs.app",
  "backtickjs-app.vercel.app",
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].filter((hostname) => hostname !== undefined);

const app = new Hono();

// Where the phone's screens come from: Backtick's home at api.backtickjs.app,
// each app at <id>.api.backtickjs.app, every path exactly as the app's server
// has it. Matched by host, before the routes below, which are backtickjs.app's.
const screens = "api.backtickjs.app";

app.use("*", async (c, next) => {
  const host = new URL(c.req.url).hostname;
  if (host === screens) {
    return (await refusedToken(c)) ?? home.fetch(c.req.raw);
  }
  if (host.endsWith("." + screens)) {
    return runtime(c, host.slice(0, -("." + screens).length));
  }
  await next();
});

// Android's App Links: the phone app opens backtickjs.app/apps/* and
// /auth/callback itself. The fingerprints are the SHA-256 of each certificate
// the app is signed with (the development build's, EAS's, Google Play's),
// comma-separated.
app.get("/.well-known/assetlinks.json", (c) => {
  const fingerprints = process.env.ANDROID_CERT_SHA256;
  if (fingerprints === undefined) {
    return c.notFound();
  }
  return c.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.backtickjs.app",
        sha256_cert_fingerprints: fingerprints.split(",").map((f) => f.trim()),
      },
    },
  ]);
});

// Where a host finds out how to sign in: this endpoint is a resource whose
// tokens Supabase's OAuth server issues.
app.get(
  "/.well-known/*",
  async (c) =>
    oauthMetadataResponse(c.req.raw, {
      oauthMetadata: await authorizationServer(),
      resourceServerUrl: new URL("/mcp", c.req.url),
      resourceName: "Backtick",
    }) ?? c.notFound(),
);

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

// What Google's sign-in screen links to, with backtickjs.com's home page.
app.get("/privacy", async (c) => c.html(await privacyPage()));

// Where Supabase sends a user to allow a host: Authentication → OAuth Server →
// Authorization Path.
app.get("/oauth/consent", async (c) => c.html(await consentPage()));

// Each request carries the user's access token. Without a valid one, a 401
// that points at the documents above.
app.all("/mcp", async (c) => {
  const rejected = hostHeaderValidationResponse(c.req.raw, hostnames);
  if (rejected !== undefined) {
    return rejected;
  }
  const auth = await requireBearerAuth({
    verifier,
    resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(
      new URL("/mcp", c.req.url),
    ),
  })(c.req.raw);
  return auth instanceof Response
    ? auth
    : mcp.fetch(c.req.raw, { authInfo: auth });
});

// The response turning a phone away, if its token doesn't check out, so the
// home's screens trust one that arrives. No token is fine: that's sign-in.
async function refusedToken(c: Context): Promise<Response | undefined> {
  if (c.req.header("authorization") !== undefined) {
    const auth = await requireBearerAuth({ verifier })(c.req.raw);
    if (auth instanceof Response) {
      return auth;
    }
  }
  return undefined;
}

// Where Google's sign-in returns to the phone app. A phone whose App Link is
// verified opens the app instead of this page; if the browser shows it, the
// button hands the code to the app by its scheme. The code is useless without
// the verifier the phone keeps (PKCE).
app.get("/auth/callback", (c) => {
  const code = c.req.query("code");
  const problem = c.req.query("error_description");
  return c.html(
    html`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Back to Backtick</title>
          <style>
            body {
              font:
                17px system-ui,
                sans-serif;
              margin: 0;
              padding: 48px 24px;
              color: #17201b;
              background: #f3f5f2;
            }
            a {
              display: inline-block;
              margin-top: 16px;
              padding: 14px 20px;
              border-radius: 8px;
              background: #1f7a55;
              color: #fff;
              font-weight: 600;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          ${code === undefined
            ? html`<p>
                Google's sign-in didn't finish${problem ? `: ${problem}` : "."}
              </p>`
            : html`<p>You're signed in. Head back to the app to continue.</p>
                <a
                  href="backtick://auth/callback?code=${encodeURIComponent(
                    code,
                  )}"
                  >Return to Backtick</a
                >`}
        </body>
      </html>`,
  );
});

// The phone opens an app: its latest version, bundled in the sandbox for the
// phone's modules, standing in for the runtime (plan, section 10). Apps are
// one screen, so the path is ignored for now.
async function runtime(c: Context, id: string): Promise<Response> {
  const caller = await phone(c);
  if (caller instanceof Response) {
    return caller;
  }
  const latest = z.uuid().safeParse(id).success
    ? await latestVersion(id, caller.owner)
    : undefined;
  if (latest === undefined) {
    return c.notFound();
  }
  const bundled = await bundleInSandbox(
    caller.owner,
    latest.source,
    caller.modules,
    snapshotId(),
  );
  if (!bundled.ok) {
    return c.json(
      { name: bundled.name, message: bundled.message },
      bundled.name === "ClientVersionMismatch" ? 426 : 400,
    );
  }
  return c.body(bundled.code, 200, {
    "content-type": "text/javascript",
    "x-backtick-version": String(latest.version),
  });
}

// A request from the phone: the signed-in user, and the modules the phone
// offers, or the response refusing it.
async function phone(
  c: Context,
): Promise<{ owner: string; modules: Record<string, string> } | Response> {
  const auth = await requireBearerAuth({ verifier })(c.req.raw);
  if (auth instanceof Response) {
    return auth;
  }
  try {
    return {
      owner: ownerOf(auth),
      modules: JSON.parse(c.req.header("x-backtick-modules") ?? ""),
    };
  } catch {
    return c.text("Send the app's modules in x-backtick-modules.", 400);
  }
}

// Supabase's OAuth server's own discovery document, fetched once per instance.
let metadata: Promise<OAuthMetadata> | undefined;
function authorizationServer(): Promise<OAuthMetadata> {
  metadata ??= fetch(
    `${process.env.SUPABASE_URL}/.well-known/oauth-authorization-server/auth/v1`,
  ).then(async (response) => {
    if (!response.ok) {
      metadata = undefined;
      throw new Error(`Supabase's OAuth server answered ${response.status}.`);
    }
    return (await response.json()) as OAuthMetadata;
  });
  return metadata;
}

export default app;
