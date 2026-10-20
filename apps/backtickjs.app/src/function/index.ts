// The Vercel Function: the MCP endpoint the hosts connect to.
import {
  createMcpHandler,
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
} from "@modelcontextprotocol/server";
import { Hono } from "hono";
import { tools } from "./tools.ts";

const mcp = createMcpHandler(() => tools());

export const app = new Hono();

// Localhost only, for now: a page in the browser can't reach it by rebinding a
// domain to 127.0.0.1.
app.all(
  "/mcp",
  (c) =>
    hostHeaderValidationResponse(c.req.raw, localhostAllowedHostnames()) ??
    mcp.fetch(c.req.raw),
);
