import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createBuilds } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { Home } from "./Home.js";

// The app's builds: each screen is bundled for the modules the requesting
// build carries, from its module map, at the versions it was built with.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

const app = new Hono();

app.get("/", async (context) => {
  const buildId = context.req.header("x-build-id") || null;
  const modules = builds.modulesOf(buildId);
  const bundle = await bundler.build({ input: <Home />, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
});

serve({ fetch: app.fetch, port: 3000 });
