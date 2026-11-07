import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { Hono } from "hono";
import { jsx } from "@backtickjs/jsx-react/jsx-runtime";
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

// The client code the runtime is: a phone's React.
const phone = {
  "x-backtick-modules": JSON.stringify({
    react: "19.3.0",
    "react/jsx-runtime": "19.3.0",
    "@tanstack/react-query": "5.104.0",
  }),
};

test("the runtime is at /.well-known/backtick/runtime, around the app's /_layout, for the phone's origin", async () => {
  const opened = new Hono();
  opened.use(backtick(opened));
  opened.get("/_layout", (context) => context.render(greet));
  const response = await opened.request(
    "http://app.test/.well-known/backtick/runtime",
    {
      headers: {
        "x-backtick-modules": JSON.stringify({
          ...JSON.parse(phone["x-backtick-modules"]),
          app: "1.0.0",
        }),
      },
    },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.equal(response.headers.get("cache-control"), "no-store");
  const code = await response.text();
  assert.match(code, /require\("react"\)/);
  assert.match(code, /\{ greet: /);
  assert.match(code, /"http:\/\/app\.test"/);
  assert.match(code, /require\("@tanstack\/react-query"\)/);
  assert.match(code, /"\/_page"/);
});

// An app with framed routes, and whether a page's handler ran.
const imported = (name: string) =>
  createImport<unknown>({ name, from: "app", version: "1.0.0" });
const ran: string[] = [];
const framedApp = new Hono();
framedApp.use(backtick(framedApp));
framedApp.get("/item/_layout", (context) =>
  context.render(imported("ItemsLayout")),
);
framedApp.get("/item/:id/_layout", (context) =>
  context.render(imported("ItemLayout")),
);
framedApp.get("/item/:id/_loading", (context) =>
  context.render(imported("ItemLoading")),
);
framedApp.get("/item/:id", (context) => {
  ran.push(context.req.path);
  return context.render(greet);
});
framedApp.get("/plain/_layout", (context) =>
  context.render(imported("PlainLayout")),
);
framedApp.get("/plain/:id", (context) => context.render(greet));
const framedHeaders = {
  "x-backtick-modules": JSON.stringify({
    react: "19.3.0",
    "react/jsx-runtime": "19.3.0",
    "@tanstack/react-query": "5.104.0",
    app: "1.0.0",
  }),
};

test("a route with a _loading answers at once: its layouts, its loading state, and a query of its page", async () => {
  ran.length = 0;
  const response = await framedApp.request("http://server.test/item/1?tab=a", {
    headers: framedHeaders,
  });
  assert.equal(response.status, 200);
  const code = await response.text();
  assert.deepEqual(ran, []);
  for (const name of ["ItemsLayout", "ItemLayout", "ItemLoading"]) {
    assert.match(code, new RegExp(`\\{ ${name}: `));
  }
  assert.ok(code.indexOf("ItemsLayout") < code.indexOf("ItemLayout:"));
  assert.match(code, /useSuspenseQuery/);
  assert.match(code, /"\/item\/1\?tab=a"/);
});

test("a route's /_page is the route alone", async () => {
  ran.length = 0;
  const response = await framedApp.request("http://server.test/item/1/_page", {
    headers: framedHeaders,
  });
  const code = await response.text();
  assert.deepEqual(ran, ["/item/1"]);
  assert.match(code, /\{ greet: /);
  assert.doesNotMatch(code, /Layout|Loading/);
});

test("a route without a _loading is drawn inside its layouts, in one answer", async () => {
  const response = await framedApp.request("http://server.test/plain/1", {
    headers: framedHeaders,
  });
  const code = await response.text();
  assert.match(code, /\{ PlainLayout: /);
  assert.match(code, /\{ greet: /);
});
