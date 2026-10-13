import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { createBuilds } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// The app's builds: each screen is bundled for the modules the requesting
// build carries, from its module map, at the versions it was built with.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

createServer(async (request, response) => {
  const buildId = request.headers["x-build-id"]?.toString() || null;
  const modules = builds.modulesOf(buildId);
  const bundle = await bundler.build({ input: <Home />, modules });
  response.setHeader("content-type", "text/javascript");
  response.end(bundle.generate({ format: "cjs" }).code);
}).listen(3000);
