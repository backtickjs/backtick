// The sandbox's side: typechecks and bundles for as long as it runs, so a warm
// sandbox loads TypeScript and parses the declarations once. Listens on
// localhost only; the function reaches it with `curl` inside the sandbox.
// `node --import @backtickjs/node-plugin src/serve.ts`, on `PORT` or 3000.
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { screen } from "./screen.ts";
import { typecheck } from "./typecheck.ts";

const app = new Hono();

app.get("/ready", (c) => c.text("ready"));

app.post("/typecheck", async (c) => {
  const { file } = await c.req.json<{ file: string }>();
  return c.json(typecheck(file));
});

// The app's answer at a path, whatever its status, for the function to pass
// on to the phone.
app.post("/screen", async (c) => {
  const { file, path, modules } = await c.req.json<{
    file: string;
    path: string;
    modules: string;
  }>();
  return c.json(await screen(file, path, modules));
});

serve({
  fetch: app.fetch,
  hostname: "127.0.0.1",
  port: Number(process.env.PORT ?? 3000),
});
