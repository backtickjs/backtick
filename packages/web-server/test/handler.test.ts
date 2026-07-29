import assert from "node:assert/strict";
import { test } from "node:test";
import { createHandler, renderDocument } from "../dist/index.js";
import type { Bundle } from "@backtickjs/core";

const options = { client: "/client/index.js" };
const handle = createHandler(
  { "/": () => null, "/about": () => "about" },
  {
    ...options,
    read: async (path) =>
      path === "/client/index.js"
        ? new TextEncoder().encode("export {}")
        : null,
  },
);
const asked = (path: string, accept?: string): Request =>
  new Request(`http://localhost${path}`, {
    headers: accept === undefined ? {} : { accept },
  });

test("answers a native client with the bundle on its own", async () => {
  for (const accept of [undefined, "application/json", "*/*"]) {
    const response = await handle(asked("/", accept));
    assert.equal(
      response.headers.get("content-type"),
      "application/json; charset=utf-8",
    );
    assert.deepEqual(await response.json(), {
      functions: {},
      trees: {},
      root: null,
    });
  }
});

test("answers a browser with the payload already in the document", async () => {
  const response = await handle(asked("/", "text/html,application/xhtml+xml"));
  assert.equal(
    response.headers.get("content-type"),
    "text/html; charset=utf-8",
  );
  const html = await response.text();
  assert.match(html, /<script type="application\/json" id="bundle">/);
  // Inlined, so the page needs no second request to draw.
  assert.doesNotMatch(html, /fetch\(/);
});

test("answers each route from the same table", async () => {
  // Same paths for every client — the envelope is what differs, not the route.
  assert.deepEqual(
    (await (await handle(asked("/about"))).json()).root,
    "about",
  );
  const html = await handle(asked("/about", "text/html"));
  assert.match(await html.text(), /id="bundle"/);
  assert.equal((await handle(asked("/missing"))).status, 404);
});

test("serves a module with a type a browser will execute", async () => {
  const response = await handle(asked("/client/index.js"));
  assert.equal(response.headers.get("content-type"), "text/javascript");
  assert.equal(await response.text(), "export {}");
  assert.equal((await handle(asked("/nope.js"))).status, 404);
});

test("closes a `</script>` carried in the data", () => {
  // A bundle carries whatever the app put in it, so a string can end the script
  // tag it sits in. Escaping `<` is what stops it.
  const carrying: Bundle = {
    functions: {},
    trees: {},
    root: "</script><script>alert(1)</script>",
  };
  const html = renderDocument(carrying, options);
  const embedded = html.slice(
    html.indexOf('id="bundle">') + 'id="bundle">'.length,
    html.indexOf("</script>"),
  );
  assert.doesNotMatch(embedded, /<\/script>/);
  assert.deepEqual(JSON.parse(embedded), carrying);
});
