import { reloadExpo } from "@backtickjs/expo/server";
import { performance } from "node:perf_hooks";
import { serve } from "@hono/node-server";
import { createRender } from "@backtickjs/bundler";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Game } from "./Game.js";

const app = new Hono();

// A screen the bundler refuses (an old build without a module it imports) is
// answered with a bundle that throws why, and logged here.
const render = createRender({ onBundlerError: (error) => console.warn(error) });

// `npm run web` serves the app from another origin, which sends its modules
// and reads the server's timing only when they're allowed.
app.use(
  cors({
    origin: "*",
    allowHeaders: ["x-backtick-modules"],
    exposeHeaders: ["server-timing"],
  }),
);

// The game, bundled for the modules the requesting build carries, as
// client/backtick.ts offers them at its packages' versions.
app.get("/game", async (context) => {
  const start = performance.now();
  const response = await render(context.req.raw, <Game />);
  const rendered = performance.now();
  const { heapUsed, rss } = process.memoryUsage();
  console.log(
    `[server] /game: bundle ${ms(rendered - start)}, ` +
      `heap ${mb(heapUsed)}, rss ${mb(rss)}`,
  );
  // The server's share of the time, for the app to tell it apart from the
  // network's: running the server components, bundling and printing them.
  response.headers.set(
    "server-timing",
    `bundle;dur=${(rendered - start).toFixed(1)}`,
  );
  return response;
});

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});

const ms = (value: number) => `${value.toFixed(1)} ms`;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// Once it listens, the app Expo serves reloads to show this server's screens.
serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
  reloadExpo();
});
