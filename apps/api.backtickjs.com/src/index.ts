// api.backtickjs.com's Vercel Function, where Vercel looks for it: the MCP
// endpoint the hosts connect to, sign-in for it, and the app bundles the
// phone gets through each app's host, <id>.backtickjs.app.
import {
  createMcpHandler,
  getOAuthProtectedResourceMetadataUrl,
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
  type OAuthMetadata,
  oauthMetadataResponse,
  requireBearerAuth,
} from "@modelcontextprotocol/server";
import { waitUntil } from "@vercel/functions";
import { Hono } from "hono";
import * as z from "zod";
import { ownerOf, verifier } from "./function/auth.ts";
import {
  screenInSandbox,
  snapshotId,
  warmSandbox,
} from "./function/sandbox.ts";
import { latestVersion } from "./function/store.ts";
import { tools } from "./function/tools.ts";
// Compiled by `tspc` first: the pages are Backtick scripts.
import { consentPage } from "../web/dist/index.js";

const mcp = createMcpHandler((context) => tools(ownerOf(context.authInfo)));

// This machine, the project's domains and the deployment's own hostnames: a
// page in the browser can't reach the endpoint by pointing another domain at
// it.
const hostnames = [
  ...localhostAllowedHostnames(),
  "api.backtickjs.com",
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

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

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

// The owner's sandbox started in the background, so their next open doesn't
// wait for it (about 3.5 s cold, 0.4 s warm). Answered at once.
app.post("/warm", async (c) => {
  const auth = await requireBearerAuth({ verifier })(c.req.raw);
  if (auth instanceof Response) {
    return auth;
  }
  waitUntil(warmSandbox(ownerOf(auth), snapshotId()));
  return c.body(null, 202);
});

// An app's latest version answering the phone at a path, its Hono server run
// in the owner's sandbox: what <id>.backtickjs.app answers the phone with,
// standing in for the runtime (plan, section 10). `/apps/<id>/day` is the
// app's `/day`.
app.get("/apps/:id/*", async (c) => {
  const id = c.req.param("id");
  const auth = await requireBearerAuth({ verifier })(c.req.raw);
  if (auth instanceof Response) {
    return auth;
  }
  const owner = ownerOf(auth);
  const latest = z.uuid().safeParse(id).success
    ? await latestVersion(id, owner)
    : undefined;
  if (latest === undefined) {
    return c.notFound();
  }
  const url = new URL(c.req.url);
  const answer = await screenInSandbox(
    owner,
    latest.source,
    (url.pathname.slice(`/apps/${id}`.length) || "/") + url.search,
    c.req.header("x-backtick-modules") ?? "{}",
    snapshotId(),
  );
  return c.body(answer.body, answer.status as 200, {
    "content-type": answer.contentType,
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
