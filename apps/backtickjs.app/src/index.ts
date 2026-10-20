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

// Until users sign in, the URL carries a secret: Claude.ai's connectors can't
// send a header. Any other path is a 404.
app.all("/mcp/:secret", (c) =>
  isSecret(c.req.param("secret"))
    ? (hostHeaderValidationResponse(c.req.raw, hostnames) ??
      mcp.fetch(c.req.raw))
    : c.notFound(),
);

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
