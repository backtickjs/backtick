// The function on this machine, building in the real sandbox and storing in
// Supabase. `pnpm dev`, with the environment `vercel env pull` writes. Add it
// to Claude Code with `claude mcp add --transport http backtick
// http://localhost:3000/mcp`, which signs in through Supabase on first use.
import { serve } from "@hono/node-server";
import app from "../src/index.ts";

serve({ fetch: app.fetch, port: Number(process.env.PORT ?? 3000) }, (info) =>
  console.log(`http://localhost:${info.port}/mcp`),
);
