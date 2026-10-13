import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Home } from "./Home.js";
import { screen } from "./screen.js";

const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(cors({ origin: "*", allowHeaders: ["x-build-id"] }));

// Your app's screens: add a route, and the app can fetch it. A path can
// take parameters, `/stories/:id`, read with `context.req.param("id")`.
app.get("/", (context) => screen(context, <Home />));

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, draws its screen again.
if (process.env.NODE_ENV === "development") {
  const run = crypto.randomUUID();
  app.get("/live", (context) => context.text(run));
}

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
});
