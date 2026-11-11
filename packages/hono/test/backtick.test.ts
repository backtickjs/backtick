import assert from "node:assert/strict";
import { test } from "node:test";
import { type Client, createImport } from "@backtickjs/core";
import type { ComponentType } from "react";
import { Hono } from "hono";
import { backtickApp, backtickRenderer } from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "1.0.0",
});

const app = new Hono();
app.use(backtickRenderer());
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
    "hono/router/pattern-router": "4.13.13",
    "expo-router": "58.0.30",
  }),
};

// An app's root layout, as its /_layout answers it.
const RootLayout = createImport<ComponentType>({
  name: "RootLayout",
  from: "app",
  version: "1.0.0",
}) as Client<ComponentType>;

// An app the Backtick app opens, with its root layout.
function openedApp() {
  const opened = new Hono();
  opened.use(backtickApp(opened));
  opened.get("/_layout", (context) => context.render(RootLayout));
  return opened;
}

test("the runtime is at /.well-known/backtick/runtime, for the phone's origin", async () => {
  const opened = openedApp();
  opened.get("/day/_loading", (context) => context.render(greet));
  opened.get("/product/:id/_loading", (context) => context.render(greet));
  opened.get("/product/:id/_layout", (context) => context.render(greet));
  opened.post("/form/_loading", (context) => context.render(greet));
  opened.use("/admin/_loading", async (_, next) => next());
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
  assert.match(code, /"http:\/\/app\.test"/);
  assert.match(code, /require\("@tanstack\/react-query"\)/);
  assert.match(code, /require\("hono\/router\/pattern-router"\)/);
  // The app's layouts and loading states, by pattern, for a screen to ask
  // only for those it has.
  assert.match(code, /layouts: \["\/_layout", "\/product\/:id\/_layout"\]/);
  assert.match(
    code,
    /loadings: \["\/day\/_loading", "\/product\/:id\/_loading"\]/,
  );
});

test("a _loading route answers what it renders, as any route does", async () => {
  const loadingApp = new Hono();
  loadingApp.use(backtickRenderer());
  loadingApp.get("/item/:id/_loading", (context) =>
    context.render(
      createImport<unknown>({
        name: "ItemLoading",
        from: "app",
        version: "1.0.0",
      }),
    ),
  );
  const response = await loadingApp.request(
    "http://server.test/item/1/_loading",
    {
      headers: { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) },
    },
  );
  assert.equal(response.status, 200);
  assert.match(await response.text(), /\{ ItemLoading: /);
});

// The runtime's answer, or why it's refused, for an app with `route`.
async function opening(route: string) {
  const opened = openedApp();
  opened.get(route, (context) => context.render(greet));
  opened.onError((error, context) => context.text(error.message, 500));
  const response = await opened.request(
    "http://app.test/.well-known/backtick/runtime",
    { headers: phone },
  );
  return { status: response.status, text: await response.text() };
}

test("a loading route with a trailing slash doesn't open, by name", async () => {
  assert.deepEqual(await opening("/day/_loading/"), {
    status: 500,
    text: "The app's /day/_loading/ route ends with a slash: write it /day/_loading.",
  });
});

test("a layout route with a trailing slash doesn't open, by name", async () => {
  assert.deepEqual(await opening("/day/_layout/"), {
    status: 500,
    text: "The app's /day/_layout/ route ends with a slash: write it /day/_layout.",
  });
});

test("an app without a /_layout route opens with a plain Stack", async () => {
  const opened = new Hono();
  opened.use(backtickApp(opened));
  const response = await opened.request(
    "http://app.test/.well-known/backtick/runtime",
    { headers: phone },
  );
  assert.equal(response.status, 200);
  const code = await response.text();
  assert.match(code, /require\("expo-router"\)/);
  assert.match(code, /layouts: \[\]/);
});

test("a nested layout route opens", async () => {
  const opened = openedApp();
  opened.get("/day/:id/_layout", (context) => context.render(greet));
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
});

test("a loading state is fetched at its pattern, and reading a param throws", async () => {
  const loadingApp = new Hono();
  loadingApp.use(backtickApp(loadingApp));
  loadingApp.get("/day/:id/_loading", (context) => context.render(greet));
  loadingApp.get("/item/:id/_loading", (context) =>
    context.render(context.req.param("id") === "" ? greet : greet),
  );
  loadingApp.onError((error, context) => context.text(error.message, 500));
  const fetched = (path: string) =>
    loadingApp.request(`http://app.test${path}`, {
      headers: { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) },
    });
  assert.equal((await fetched("/day/:id/_loading")).status, 200);
  const reading = await fetched("/item/:id/_loading");
  assert.equal(reading.status, 500);
  assert.equal(
    await reading.text(),
    "/item/:id/_loading reads a param: a loading state takes none, as in Next.js. What depends on the path goes in a _layout.",
  );
});

test("backtickApp renders every other route, as backtickRenderer does", async () => {
  const written = new Hono();
  written.use(backtickApp(written));
  written.get("/", (context) => context.render(greet));
  written.notFound((context) => context.text("No such screen", 404));
  const screen = await written.request("/", {
    headers: { "x-backtick-modules": JSON.stringify({ app: "1.0.0" }) },
  });
  assert.equal(screen.status, 200);
  assert.equal(screen.headers.get("content-type"), "text/javascript");
  const missing = await written.request("/nowhere");
  assert.equal(missing.status, 404);
  assert.equal(await missing.text(), "No such screen");
});
