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

const manifest = { name: "Crème", background_color: "#ffffff" };
const manifested = new Hono();
manifested.use(backtick({ manifest }));
manifested.get("/", (context) => context.render(greet));

test("a manifest travels with every screen, percent-encoded", async () => {
  const response = await manifested.request("/", {
    headers: { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) },
  });
  assert.deepEqual(
    JSON.parse(
      decodeURIComponent(response.headers.get("x-backtick-manifest")!),
    ),
    manifest,
  );
});

test("a manifest is served at its standard path", async () => {
  const response = await manifested.request("/manifest.webmanifest");
  assert.equal(
    response.headers.get("content-type"),
    "application/manifest+json",
  );
  assert.deepEqual(await response.json(), manifest);
});

test("without a manifest, the header and the path aren't there", async () => {
  const response = await request(JSON.stringify({ app: "1.0.0" }));
  assert.equal(response.headers.get("x-backtick-manifest"), null);
  const missing = await app.request("/manifest.webmanifest", {
    headers: { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) },
  });
  assert.equal(missing.headers.get("content-type"), "text/javascript");
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
