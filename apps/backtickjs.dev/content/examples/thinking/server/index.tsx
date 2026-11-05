import { serve } from "@hono/node-server";
import { bundler } from "@backtickjs/bundler";
import { Hono } from "hono";
import { db } from "./db.js";
import { Home } from "./Home.js";

const app = new Hono();

// Each screen is bundled for the modules the requesting build carries, from
// its module map.
app.get("/", async (context) => {
  const user = await db.userFor(context.req.header("authorization"));
  const modules = JSON.parse(context.req.header("x-backtick-modules") ?? "{}");
  const bundle = await bundler.build({ input: <Home user={user} />, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return context.body(code, 200, { "content-type": "text/javascript" });
});

serve({ fetch: app.fetch, port: 3000 });
