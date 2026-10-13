import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";
import { serve } from "@hono/node-server";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Game } from "./Game.js";

// The versions of the packages the app provides to screens: this
// project's own, as the app and this server share a package.json. A server
// for apps of many versions would tell them apart, by their user agent for
// one, and bundle each for its own.
const require = createRequire(import.meta.url);
const modules = {
  react: require("react/package.json").version,
  "react/jsx-runtime": require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
  "@react-three/fiber/native": require("@react-three/fiber/package.json")
    .version,
};

const app = new Hono();

// `npm run web` serves the app from another origin, which reads the
// server's timing only when it's exposed.
app.use(cors({ origin: "*", exposeHeaders: ["server-timing"] }));

app.get("/game", async (context) => {
  const start = performance.now();
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

const ms = (value: number) => `${value.toFixed(1)} ms`;
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Backtick server on http://localhost:3000");
});
