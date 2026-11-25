import { reloadExpo } from "@backtickjs/expo/server";
import { createRender } from "@backtickjs/bundler";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Home } from "./Home.js";

const app = new Hono();

// A screen the bundler refuses (an old build without a module it imports) is
// answered with a bundle that throws why, and logged here.
const render = createRender({ onBundlerError: (error) => console.warn(error) });

// `npm run web` serves the app from another origin.
app.use(
  cors({
    origin: "*",
    allowHeaders: ["x-backtick-modules"],
  }),
);

// Your app's screens: `render` bundles each one for the app. A path can take
// parameters, `/stories/:id`, read with `context.req.param("id")`.
app.get("/", (context) => render(context.req.raw, <Home />));

// What a route throws: logged, and answered as a 500.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});

// Once it listens, the app Expo serves reloads to show this server's screens.
serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
  reloadExpo();
});
