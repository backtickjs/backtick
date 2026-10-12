import { createServer } from "node:http";
import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";
import { bundler } from "@backtickjs/bundler";
import { Game } from "./Game.js";

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, draws its screen again.
const development = process.env.NODE_ENV === "development";
const run = crypto.randomUUID();

// The versions of the packages the app provides to screens: this
// project's own, as the app and this server share a package.json. A server
// for apps of many versions would tell them apart, by their user agent for
// one, and bundle each for its own.
const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
  "@react-three/fiber": require("@react-three/fiber/package.json").version,
};

const server = createServer(async (request, response) => {
  if (development && request.url === "/live") {
    response.end(run);
    return;
  }
  if (request.url === "/game") {
    try {
      const start = performance.now();
      const bundle = await bundler.build({ input: <Game />, packageVersions });
      const built = performance.now();
      const { code } = bundle.generate({ format: "cjs" });
      const generated = performance.now();
      const { heapUsed, rss } = process.memoryUsage();
      // The server's share of the time, for the app to tell it apart from the
      // network's: running the server components and bundling them, then
      // printing the code.
      response.setHeader(
        "server-timing",
        `build;dur=${(built - start).toFixed(1)}, ` +
          `generate;dur=${(generated - built).toFixed(1)}`,
      );
      response.setHeader("content-type", "text/javascript");
      response.end(code);
      console.log(
        `[server] ${request.url}: build ${ms(built - start)}, ` +
          `generate ${ms(generated - built)}, ${kb(Buffer.byteLength(code))}, ` +
          `heap ${mb(heapUsed)}, rss ${mb(rss)}`,
      );
    } catch (error) {
      // Answered rather than crashed on, so the app can show why.
      console.error(error);
      response.statusCode = 500;
      response.end(String(error));
    }
    return;
  }
  response.statusCode = 404;
  response.end();
});

const ms = (value: number) => `${value.toFixed(1)} ms`;
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

server.listen(3000, () => {
  console.log("Backtick server on http://localhost:3000");
});
