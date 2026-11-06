import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { Hono } from "hono";
import { backtick, type RootLayoutProps } from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "1.0.0",
});

const layout = createImport<(props: RootLayoutProps) => unknown>({
  name: "layout",
  from: "app",
  version: "1.0.0",
});

const app = new Hono();
app.use(backtick({ rootLayout: layout }));
app.get("/", (context) => context.render(greet));
app.notFound((context) => {
  context.status(404);
  return context.render(greet);
});
app.onError((_, context) => {
  context.status(500);
  return context.render(greet);
});
app.get("/broken", () => {
  throw new Error("broken");
});

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

test("screens are never stored", async () => {
  const response = await request(JSON.stringify({ app: "1.0.0" }));
  assert.equal(response.headers.get("cache-control"), "no-store");
});

for (const [path, status] of [
  ["/missing", 404],
  ["/broken", 500],
] as const) {
  test(`a screen answers with the context's status (${status})`, async () => {
    const response = await app.request(path, {
      headers: { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) },
    });
    assert.equal(response.status, status);
    assert.equal(response.headers.get("content-type"), "text/javascript");
  });
}

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

const home = createImport<string>({
  name: "home",
  from: "app",
  version: "1.0.0",
});
const laidOut = new Hono();
laidOut.use(backtick({ rootLayout: layout }));
laidOut.get("/", (context) => context.render(home));

const modules = { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) };

test("the root layout is at /.well-known/backtick/root-layout, bundled like a screen", async () => {
  const response = await laidOut.request("/.well-known/backtick/root-layout", {
    headers: modules,
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const code = await response.text();
  assert.match(code, /layout/);
  assert.doesNotMatch(code, /home/);
});

test("screens are unchanged by a root layout", async () => {
  const response = await laidOut.request("/", { headers: modules });
  assert.match(await response.text(), /home/);
});
