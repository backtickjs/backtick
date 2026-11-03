// The function on this machine, with the environment `vercel env pull` writes.
import { serve } from "@hono/node-server";
import app from "../src/index.ts";

serve({ fetch: app.fetch, port: Number(process.env.PORT ?? 3001) }, (info) =>
  console.log(`http://localhost:${info.port}/authorize`),
);
