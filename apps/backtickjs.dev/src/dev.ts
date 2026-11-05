// The site on this computer, as Vercel serves it: `public/` as files, then the
// site's routes. `pnpm start` builds and runs it again on each save.
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { app } from "./app.js";

// Files first, then the site itself, its not-found page included.
const dev = new Hono();
dev.use(serveStatic({ root: "public" }));
dev.all("*", (context) => app.fetch(context.req.raw));

serve({ fetch: dev.fetch, port: 4321 }, ({ port }) => {
  console.log(`Preview on http://localhost:${port}/`);
});
