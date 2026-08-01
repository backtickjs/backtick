import assert from "node:assert/strict";
import { test } from "node:test";
import { createHandler } from "../dist/server/index.js";

const page = '<!doctype html><html><body><div id="root"></div></body></html>';
const handle = createHandler(
  [
    {
      path: "/",
      html: "/index.html",
      render: () => [{ target: "#root", component: null }],
    },
    {
      path: "/todos/new",
      html: "/index.html",
      render: () => [{ target: "#root", component: "new" }],
    },
    {
      path: "/todos/:id",
      html: "/index.html",
      render: ({ params }) => [{ target: "#root", component: params.id }],
    },
    {
      path: "/dashboard",
      html: "/dashboard.html",
      render: () => [
        { target: "#body", component: "body" },
        { target: "#aside", component: "aside" },
      ],
    },
  ],
  {
    read: async (path) =>
      path === "/index.html"
        ? new TextEncoder().encode(page)
        : path === "/main.js"
          ? new TextEncoder().encode("export {}")
          : null,
  },
);
const asked = (path: string, accept?: string): Request =>
  new Request(`http://localhost${path}`, {
    headers: accept === undefined ? {} : { accept },
  });

test("answers a browser with the page the app wrote, unchanged", async () => {
  const response = await handle(asked("/", "text/html"));
  assert.equal(response.headers.get("content-type"), "text/html");
  assert.equal(await response.text(), page);
});

test("answers everyone else with what to draw where", async () => {
  for (const accept of [undefined, "application/json", "*/*"]) {
    const response = await handle(asked("/todos/42", accept));
    assert.equal(
      response.headers.get("content-type"),
      "application/json; charset=utf-8",
    );
    assert.deepEqual(await response.json(), [
      { target: "#root", bundle: { functions: {}, trees: {}, root: "42" } },
    ]);
  }
});

test("a route earlier in the list wins the path", async () => {
  // `/todos/new` is a page, `/todos/:id` is a parameter, and both match. The
  // order they were written in is what says which was meant.
  assert.equal(
    (await (await handle(asked("/todos/new"))).json())[0].bundle.root,
    "new",
  );
});

test("a page draws every target it holds, in order", async () => {
  const drawn = await (await handle(asked("/dashboard"))).json();
  assert.deepEqual(
    drawn.map((each: { target: string }) => each.target),
    ["#body", "#aside"],
  );
});

test("a route names the page it opens", async () => {
  // `/dashboard` asks for a document that isn't there, and says so rather than
  // serving the default page.
  assert.equal((await handle(asked("/dashboard", "text/html"))).status, 404);
});

test("serves a module with a type a browser will execute", async () => {
  const response = await handle(asked("/main.js"));
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.equal(await response.text(), "export {}");
});

// A page that names the client every way a browser would read it, and once in
// prose, which is not a way a browser would read it.
const wired = [
  "<!doctype html><html><head>",
  '<link rel="modulepreload" href="/backtick.js">',
  '</head><body><div id="root"></div>',
  '<script type="module" src="/backtick.js"></script>',
  '<script type="module">import { start } from "/backtick.js"; await start();</script>',
  "<p>The client is served at /backtick.js — write that, not the built name.</p>",
  "</body></html>",
].join("");

const client = "/backtick-IEB5UTWZ.js";
const wiring = createHandler(
  [{ path: "/", html: "/index.html", render: () => [] }],
  {
    client,
    read: async (path) =>
      path === "/index.html" || path === "/loose.html"
        ? new TextEncoder().encode(wired)
        : path === client
          ? new TextEncoder().encode("export const client = 1")
          : null,
  },
);

test("resolves the client where a page names it as a URL", async () => {
  const html = await (
    await wiring(
      new Request("http://localhost/", { headers: { accept: "text/html" } }),
    )
  ).text();
  assert.equal(html.match(/\/backtick-IEB5UTWZ\.js/g)?.length, 3);
  assert.ok(html.includes(`href="${client}"`));
  assert.ok(html.includes(`src="${client}"`));
  assert.ok(html.includes(`from "${client}"`));
});

test("leaves the name alone where a page only mentions it", async () => {
  const html = await (
    await wiring(
      new Request("http://localhost/", { headers: { accept: "text/html" } }),
    )
  ).text();
  assert.ok(html.includes("served at /backtick.js — write that"));
});

test("resolves it in any page it serves, not only a route's", async () => {
  const html = await (
    await wiring(new Request("http://localhost/loose.html"))
  ).text();
  assert.ok(html.includes(`src="${client}"`));
});

test("the built name is cached for a year and never revalidated", async () => {
  const response = await wiring(new Request(`http://localhost${client}`));
  assert.equal(
    response.headers.get("cache-control"),
    "public, max-age=31536000, immutable",
  );
  assert.equal(response.headers.get("etag"), null);
});

test("a route's answers carry no tag, because one could never mean either", async () => {
  // The page and the bundle share the path, and a browser keeps one entry per
  // URL — a tag from either would be sent back for the other and always miss.
  for (const accept of ["text/html", "application/json"]) {
    const response = await wiring(
      new Request("http://localhost/", { headers: { accept } }),
    );
    assert.equal(response.headers.get("etag"), null);
    assert.equal(response.headers.get("cache-control"), "no-cache");
  }
});

test("a file at its own URL is revalidated, and answers 304 when it has not changed", async () => {
  const first = await wiring(new Request("http://localhost/loose.html"));
  const etag = first.headers.get("etag");
  assert.equal(first.headers.get("cache-control"), "no-cache");
  assert.ok(etag);
  const again = await wiring(
    new Request("http://localhost/loose.html", {
      headers: { "if-none-match": etag },
    }),
  );
  assert.equal(again.status, 304);
  assert.equal((await again.arrayBuffer()).byteLength, 0);
});

test("a page and its bundle share a path, so a cache is told what varies", async () => {
  for (const accept of ["text/html", "application/json"]) {
    const response = await wiring(
      new Request("http://localhost/", { headers: { accept } }),
    );
    assert.equal(response.headers.get("vary"), "accept");
  }
});
