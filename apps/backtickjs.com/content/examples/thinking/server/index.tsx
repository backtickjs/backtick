import { fileURLToPath } from "node:url";
import { serve } from "@hono/node-server";
import { createBuilds } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { db } from "./db.js";
import { Home } from "./Home.js";

// Your app's builds: each screen is bundled for the modules the requesting
// build carries, from its module map.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

const app = new Hono();

app.get("/", async (context) => {
  const user = await db.userFor(context.req.header("authorization"));
  const modules = builds.modulesOf(context.req.header("x-build-id") || null);
  const bundle = await bundler.build({ input: <Home user={user} />, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
});

serve({ fetch: app.fetch, port: 3000 });
