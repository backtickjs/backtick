import { reloadExpo } from "@backtickjs/expo/server";
import { render } from "@backtickjs/bundler";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Home } from "./Home.js";

const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(
  cors({
    origin: "*",
    allowHeaders: ["x-backtick-modules", "x-backtick-format"],
  }),
);

// Your app's screens: `render` bundles each one for the app. A path can take
// parameters, `/stories/:id`, read with `context.req.param("id")`.
app.get("/", (context) => render(context.req.raw, <Home />));

// A screen the app can't run answers itself (406); anything else is a 500.
app.onError((error, context) => {
  if ("getResponse" in error) {
    return error.getResponse();
  }
  console.error(error);
  return context.text(String(error), 500);
});

// Once it listens, the app Expo serves reloads to show this server's screens.
serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
  reloadExpo();
});
