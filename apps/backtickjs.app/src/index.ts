// The Vercel Function, where Vercel looks for it: the MCP endpoint the hosts
// connect to, as the default export.
import { timingSafeEqual } from "node:crypto";
import {
  createMcpHandler,
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
} from "@modelcontextprotocol/server";
import { Hono } from "hono";
import { tools } from "./function/tools.ts";

const mcp = createMcpHandler(() => tools());

// This machine and the deployment's own hostnames: a page in the browser can't
// reach the endpoint by pointing another domain at it.
const hostnames = [
  ...localhostAllowedHostnames(),
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].filter((hostname) => hostname !== undefined);

const app = new Hono();

// Until users sign in, each request carries a secret as a bearer token, set
// as a header in the host's connector. Without it, a 404.
app.all("/mcp", (c) => {
  const authorization = c.req.header("authorization") ?? "";
  if (!isSecret(authorization.replace(/^Bearer /, ""))) {
    console.log("Refused", c.req.method, c.req.path, describe(authorization));
    return c.notFound();
  }
  return (
    hostHeaderValidationResponse(c.req.raw, hostnames) ?? mcp.fetch(c.req.raw)
  );
});

// What came instead of the secret, without the secret: whether it starts
// with `Bearer `, and its length.
function describe(authorization: string): string {
  return authorization === ""
    ? "no authorization"
    : `authorization ${authorization.startsWith("Bearer ") ? "Bearer" : "without Bearer"}, ${authorization.length} chars`;
}

function isSecret(given: string): boolean {
  const secret = Buffer.from(process.env.MCP_SECRET ?? "");
  const candidate = Buffer.from(given);
  return (
    secret.length > 0 &&
    candidate.length === secret.length &&
    timingSafeEqual(candidate, secret)
  );
}

export default app;
