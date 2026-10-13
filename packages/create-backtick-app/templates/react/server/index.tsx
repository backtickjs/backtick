import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Home } from "./Home.js";
import { development, toHtml } from "./html.js";

const app = new Hono();

// Your pages: add a route, and the browser can open it. A path can take
// parameters, `/stories/:id`, read with `context.req.param("id")`.
app.get("/", async (context) => context.html(await toHtml(<Home />)));

// In development, this run of the server: `--watch` starts a new one whenever
// you save, and the page, seeing a new one at `/live`, reloads.
if (development) {
  const run = crypto.randomUUID();
  app.get("/live", (context) => context.text(run));
}

// Answered rather than crashed on, so the browser can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
});
