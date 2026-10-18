import { serve } from "@hono/node-server";
import { parseModules } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { Home } from "./Home.js";

const app = new Hono();

// Each screen is bundled for the modules the requesting build carries, from
// its module map, at the versions it was built with.
app.get("/", async (context) => {
  const modules = parseModules(context.req.header("x-backtick-modules"));
  const bundle = await bundler.build({ input: <Home />, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
});

serve({ fetch: app.fetch, port: 3000 });
