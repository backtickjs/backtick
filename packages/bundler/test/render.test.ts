import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport, createJsxElement, cs } from "@backtickjs/core";
import { BundlerError, ClientVersionMismatch, render } from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "1.0.0",
});

const request = (modules?: string) =>
  new Request("http://app.test/", {
    headers: modules === undefined ? {} : { "x-backtick-modules": modules },
  });

const phone = JSON.stringify({ app: "1.0.0" });

test("a render is its input bundled as CommonJS for the client's modules", async () => {
  const response = await render(request(phone), cs`$greet("world")`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.match(await response.text(), /require\("app"\)/);
});

test("renders are never stored", async () => {
  const response = await render(request(phone), greet);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("a render answers with the status it's given", async () => {
  const response = await render(request(phone), greet, { status: 404 });
  assert.equal(response.status, 404);
  assert.equal(response.headers.get("content-type"), "text/javascript");
});

test("the route's headers win over a render's own", async () => {
  const response = await render(request(phone), greet, {
    headers: { "cache-control": "max-age=60", "set-cookie": "seen=1" },
  });
  assert.equal(response.headers.get("cache-control"), "max-age=60");
  assert.equal(response.headers.get("set-cookie"), "seen=1");
  assert.equal(response.headers.get("content-type"), "text/javascript");
});

test("a request that doesn't say what the app has is a 400", async () => {
  const error = await render(request(), greet).then(
    () => assert.fail("rendered"),
    (error: unknown) => error,
  );
  assert.ok(error instanceof BundlerError);
  assert.equal(error.status, 400);
  assert.match(error.message, /^x-backtick-modules is missing/);
});

test("a client without a module the bundle needs gets a 406 naming it", async () => {
  const error = await render(request("{}"), greet).then(
    () => assert.fail("rendered"),
    (error: unknown) => error,
  );
  assert.ok(error instanceof ClientVersionMismatch);
  assert.equal(error.status, 406);
  const response = error.getResponse();
  assert.equal(response.status, 406);
  const { name, message } = await response.json();
  assert.equal(name, "ClientVersionMismatch");
  assert.match(message, /greet/);
});

test("modules that aren't JSON are a 400", async () => {
  const error = await render(request("{"), greet).then(
    () => assert.fail("rendered"),
    (error: unknown) => error,
  );
  assert.ok(error instanceof BundlerError);
  assert.ok(error.cause instanceof SyntaxError);
  const response = error.getResponse();
  assert.equal(response.status, 400);
  const { name, message } = await response.json();
  assert.equal(name, "BundlerError");
  assert.match(message, /^x-backtick-modules isn't JSON: /);
});

test("an error a server component throws passes through as it is", async () => {
  const broken = new Error("broken");
  const Broken = () => {
    throw broken;
  };
  await assert.rejects(
    () => render(request(phone), cs`${createJsxElement(Broken, {})}`),
    (error) => error === broken,
  );
});
