// The sandbox's side: typechecks and compiles for as long as it runs, so a warm sandbox loads TypeScript and parses the declarations once. Listens on
// localhost only; the function reaches it with `curl` inside the sandbox.
// `node --import @backtickjs/node-plugin src/serve.ts`, on `PORT` or 3000.
import { fileURLToPath } from "node:url";
import { installedPackages } from "@backtickjs/core/node";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compile } from "./compile.ts";
import { typecheck } from "./typecheck.ts";

const app = new Hono();

// What this sandbox has installed, each at its exact version: what a release
// it compiles was built against, as a lockfile records it. Fixed while it runs.
const packages = installedPackages(
  fileURLToPath(new URL("..", import.meta.url)),
);

app.get("/ready", (c) => c.text("ready"));

app.post("/typecheck", async (c) => {
  const { file } = await c.req.json<{ file: string }>();
  return c.json(typecheck(file));
});

// What a save checks: the typecheck, then, if it's clean, the release the app
// compiles to and the packages it was built with. One call, so the app is
// written here once.
app.post("/check", async (c) => {
  const { file } = await c.req.json<{ file: string }>();
  const typechecked = typecheck(file);
  if (typechecked.errors.length > 0) {
    return c.json(typechecked);
  }
  const release = await compile(file);
  return c.json(
    release.errors === undefined
      ? { ...typechecked, compiled: release.code, packages }
      : { ...typechecked, errors: release.errors },
  );
});

serve({
  fetch: app.fetch,
  hostname: "127.0.0.1",
  port: Number(process.env.PORT ?? 3000),
});
