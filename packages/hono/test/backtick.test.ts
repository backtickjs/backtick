import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { Hono } from "hono";
import { backtick } from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "1.0.0",
});

const app = new Hono();
app.use(backtick());
app.get("/", (context) => context.render(greet));

const request = (modules?: string) =>
  app.request(
    "/",
    modules === undefined ? {} : { headers: { "x-backtick-modules": modules } },
  );

test("a screen is its input bundled as CommonJS for the client's modules", async () => {
  const response = await request(JSON.stringify({ app: "1.0.0" }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.match(await response.text(), /require\("app"\)/);
});

test("a client without a module the screen needs gets a 426 naming it", async () => {
  const response = await request();
  assert.equal(response.status, 426);
  const { name, message } = await response.json();
  assert.equal(name, "ClientVersionMismatch");
  assert.match(message, /greet/);
});

test("modules that aren't JSON are a 400", async () => {
  const response = await request("{");
  assert.equal(response.status, 400);
  const { name, message } = await response.json();
  assert.equal(name, "SyntaxError");
  assert.match(message, /^x-backtick-modules isn't JSON: /);
});
