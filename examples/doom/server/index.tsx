import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createBuilds } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Game } from "./Game.js";

// The app's builds: each sends its id, and the game is bundled for the
// modules that build carries, from client/moduleMap.ts. A build in players'
// hands keeps working as the game moves on, once registered: see builds/.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

const app = new Hono();

// `npm run web` serves the app from another origin, which sends its build id
// and reads the server's timing only when they're allowed.
app.use(
  cors({
    origin: "*",
    allowHeaders: ["x-build-id"],
    exposeHeaders: ["server-timing"],
  }),
);

app.get("/game", async (context) => {
  const start = performance.now();
  const modules = builds.modulesOf(context.req.header("x-build-id") ?? null);
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

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
});
