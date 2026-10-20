// The function on this machine, at http://localhost:3000/mcp, building in the
// real sandbox. `node --env-file=.env.local scripts/dev.ts`, with SNAPSHOT_ID
// in the environment. Add it to Claude Code with
// `claude mcp add --transport http backtick http://localhost:3000/mcp`.
import { serve } from "@hono/node-server";
import { app } from "../src/function/index.ts";

serve({ fetch: app.fetch, port: Number(process.env.PORT ?? 3000) }, (info) =>
  console.log(`http://localhost:${info.port}/mcp`),
);
