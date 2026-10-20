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
import { Hono } from "hono";
import * as z from "zod";
import { ownerOf, verifier } from "./function/auth.ts";
import { bundleInSandbox, snapshotId } from "./function/sandbox.ts";
import { latestVersion } from "./function/store.ts";
import { tools } from "./function/tools.ts";
// Compiled by `tspc` first: the pages are Backtick scripts.
import { consentPage, homePage, privacyPage } from "../web/dist/index.js";

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

// What Google's sign-in screen links to, and what the domain shows.
app.get("/", async (c) => c.html(await homePage()));
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

// The phone opens an app: its latest version, bundled for the modules the
// phone sent in `x-backtick-modules`, as any Backtick client does. A module
// the phone lacks is a 426, which the phone answers with its update screen.
app.get("/apps/:id", async (c) => {
  const rejected = hostHeaderValidationResponse(c.req.raw, hostnames);
  if (rejected !== undefined) {
    return rejected;
  }
  const auth = await requireBearerAuth({ verifier })(c.req.raw);
  if (auth instanceof Response) {
    return auth;
  }
  const id = c.req.param("id");
  let modules: unknown;
  try {
    modules = JSON.parse(c.req.header("x-backtick-modules") ?? "");
  } catch {
    return c.text("Send the app's modules in x-backtick-modules.", 400);
  }
  const latest = z.uuid().safeParse(id).success
    ? await latestVersion(id, ownerOf(auth))
    : undefined;
  if (latest === undefined) {
    return c.notFound();
  }
  const bundled = await bundleInSandbox(
    ownerOf(auth),
    latest.source,
    modules as Record<string, string>,
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
});

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
