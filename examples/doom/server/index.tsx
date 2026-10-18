import { reloadExpo } from "@backtickjs/expo/server";
import { performance } from "node:perf_hooks";
import { serve } from "@hono/node-server";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Game } from "./Game.js";

const app = new Hono();

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
// client/moduleMap.ts offers them at its packages' versions.
app.get("/game", async (context) => {
  const start = performance.now();
  const modules = JSON.parse(context.req.header("x-backtick-modules") ?? "{}");
  const bundle = await bundler.build({ input: <Game />, modules });
  const built = performance.now();
  const { code } = bundle.generate({ format: "cjs" });
  const generated = performance.now();
  const { heapUsed, rss } = process.memoryUsage();
  console.log(
    `[server] /game: build ${ms(built - start)}, ` +
      `generate ${ms(generated - built)}, ${kb(Buffer.byteLength(code))}, ` +
      `heap ${mb(heapUsed)}, rss ${mb(rss)}`,
  );
  return context.body(code, 200, {
    "content-type": "text/javascript",
    // The server's share of the time, for the app to tell it apart from the
    // network's: running the server components and bundling them, then
    // printing the code.
    "server-timing":
      `build;dur=${(built - start).toFixed(1)}, ` +
      `generate;dur=${(generated - built).toFixed(1)}`,
  });
});

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});

const ms = (value: number) => `${value.toFixed(1)} ms`;
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// Once it listens, the app Expo serves reloads to show this server's screens.
serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
  reloadExpo();
});
