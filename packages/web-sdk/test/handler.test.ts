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
      { target: "#root", bundle: { functions: {}, root: "42" } },
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

const client = "/backtick.js";
const wired = [
  "<!doctype html><html><head>",
  `<link rel="modulepreload" href="${client}">`,
  '</head><body><div id="root"></div>',
  `<script type="module" src="${client}"></script>`,
  "</body></html>",
].join("");

const wiring = createHandler(
  [{ path: "/", html: "/index.html", render: () => [] }],
  {
    read: async (path) =>
      path === "/index.html" || path === "/loose.html"
        ? new TextEncoder().encode(wired)
        : path === client
          ? new TextEncoder().encode("export const client = 1")
          : null,
  },
);

test("serves a page exactly as it was written", async () => {
  // The name a page writes for the client is the name it is served under, so
  // there is nothing to resolve and no page to rewrite on the way out.
  const html = await (
    await wiring(
      new Request("http://localhost/", { headers: { accept: "text/html" } }),
    )
  ).text();
  assert.equal(html, wired);
});

test("everything served is asked for again next time", async () => {
  // One rule, and no revalidation to get wrong: a dev server reads its files
  // per request anyway, and a route answers with what is true now.
  const asked = [
    new Request(`http://localhost${client}`),
    new Request("http://localhost/loose.html"),
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    new Request("http://localhost/", {
      headers: { accept: "application/json" },
    }),
  ];
  for (const request of asked) {
    const response = await wiring(request);
    assert.equal(response.headers.get("cache-control"), "no-cache");
    assert.equal(response.headers.get("etag"), null);
  }
});

test("a page and its bundle share a path, so a cache is told what varies", async () => {
  for (const accept of ["text/html", "application/json"]) {
    const response = await wiring(
      new Request("http://localhost/", { headers: { accept } }),
    );
    assert.equal(response.headers.get("vary"), "accept");
  }
});
