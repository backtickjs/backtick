// The sandbox's side: typechecks and bundles for as long as it runs, so a warm
// sandbox loads TypeScript and parses the declarations once. Listens on
// localhost only; the function reaches it with `curl` inside the sandbox.
// `node --import @backtickjs/node-plugin src/serve.ts`, on `PORT` or 3000.
import { serve } from "@hono/node-server";
import { BundlerError } from "@backtickjs/bundler";
import { Hono } from "hono";
import { bundle } from "./bundle.ts";
import { typecheck } from "./typecheck.ts";

const app = new Hono();

app.get("/ready", (c) => c.text("ready"));

app.post("/typecheck", async (c) => {
  const { file } = await c.req.json<{ file: string }>();
  return c.json(typecheck(file));
});

// A refusal is the bundler's error, by name, for the function to answer the
// phone with: a `ClientVersionMismatch` is the update screen.
app.post("/bundle", async (c) => {
  const { file, modules } = await c.req.json<{
    file: string;
    modules: Record<string, string>;
  }>();
  try {
    return c.json({ ok: true, ...(await bundle(file, modules)) });
  } catch (error) {
    if (error instanceof BundlerError) {
      return c.json({ ok: false, name: error.name, message: error.message });
    }
    throw error;
  }
});

serve({
  fetch: app.fetch,
  hostname: "127.0.0.1",
  port: Number(process.env.PORT ?? 3000),
});
