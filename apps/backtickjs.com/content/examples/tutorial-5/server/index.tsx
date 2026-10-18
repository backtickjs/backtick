import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Home } from "./Home.js";
import { saveOrder } from "./orders.js";
import { screen } from "./screen.js";

const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(cors({ origin: "*", allowHeaders: ["x-backtick-modules"] }));

// Your app's screens: add a route, and the app can fetch it. A path can
// take parameters, `/stories/:id`, read with `context.req.param("id")`.
// with where the app reached this server, for the screen to send its order to
app.get("/", (context) =>
  screen(context, <Home origin={new URL(context.req.url).origin} />),
);

app.post("/orders", async (context) => {
  await saveOrder(await context.req.json());
  return context.body(null);
});

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
});
