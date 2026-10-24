// The sandbox's side: typechecks and compiles for as long as it runs, so a warm sandbox loads TypeScript and parses the declarations once. Listens on
// localhost only; the function reaches it with `curl` inside the sandbox.
// `node --import @backtickjs/node-plugin src/serve.ts`, on `PORT` or 3000.
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compile } from "./compile.ts";
import { typecheck } from "./typecheck.ts";

const app = new Hono();

app.get("/ready", (c) => c.text("ready"));

app.post("/typecheck", async (c) => {
  const { file } = await c.req.json<{ file: string }>();
  return c.json(typecheck(file));
});

// What a save checks: the typecheck, then, if it's clean, the release the app
// compiles to. One call, so the app is written here once.
app.post("/check", async (c) => {
  const { file } = await c.req.json<{ file: string }>();
  const typechecked = typecheck(file);
  if (typechecked.errors.length > 0) {
    return c.json(typechecked);
  }
  const release = await compile(file);
  return c.json(
    release.errors === undefined
      ? { ...typechecked, compiled: release.code }
      : { ...typechecked, errors: release.errors },
  );
});

serve({
  fetch: app.fetch,
  hostname: "127.0.0.1",
  port: Number(process.env.PORT ?? 3000),
});
