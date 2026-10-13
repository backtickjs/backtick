import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { createBuilds, DeprecatedBuild } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, draws its screen again.
const development = process.env.NODE_ENV === "development";
const run = crypto.randomUUID();

// Your app's builds: each sends its id, and a screen is bundled for the
// modules that build carries, from moduleMap.ts. A build in users' hands
// keeps working as your app moves on, once registered: see builds/.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

const server = createServer(async (request, response) => {
  // `npm run web` serves the app from another origin.
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader("access-control-allow-headers", "x-build-id");
  if (request.method === "OPTIONS") {
    response.end();
    return;
  }
  if (development && request.url === "/live") {
    response.end(run);
    return;
  }
  if (request.url === "/home") {
    try {
      const buildId = request.headers["x-build-id"]?.toString() || null;
      const modules = builds.modulesOf(buildId);
      const bundle = await bundler.build({ input: <Home />, modules });
      const { code } = bundle.generate({ format: "cjs" });
      response.setHeader("content-type", "text/javascript");
      response.end(code);
    } catch (error) {
      // A build you retired: the app asks its user to update.
      if (error instanceof DeprecatedBuild) {
        response.statusCode = 426;
        response.end(String(error));
        return;
      }
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

server.listen(3000, () => {
  console.log("Backtick server on http://localhost:3000");
});
