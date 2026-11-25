import { serve } from "@hono/node-server";
import { createRender } from "@backtickjs/bundler";
import { Hono } from "hono";
import { db } from "./db.js";
import { Home } from "./Home.js";

const app = new Hono();

// A screen the bundler refuses (an old build without a module it imports) is
// answered with a bundle that throws why, and logged here.
const render = createRender({ onBundlerError: (error) => console.warn(error) });

// Each screen is bundled for the modules the requesting build carries, from
// its module map.
app.get("/", async (context) => {
  const user = await db.userFor(context.req.header("authorization"));
  return render(context.req.raw, <Home user={user} />);
});

serve({ fetch: app.fetch, port: 3000 });
