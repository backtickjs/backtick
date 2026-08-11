import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { clientUrl } from "../dist/browserClient.js";
import { jsx } from "../dist/jsx-runtime/index.js";
import { island, toHtml } from "../dist/toHtml.js";

const drawn = await bundle(jsx("p", { children: "hi" }));
const other = await bundle(jsx("p", { children: "there" }));

describe("toHtml", () => {
  it("writes one element holding the bundle and then the client", () => {
    // The order is the whole of how the client finds its work: the bundle is the
    // element in front of it, and where to draw is the element they are in.
    const html = toHtml(drawn);
    assert.match(html, /^<!doctype html><html><head>/);
    assert.match(
      html,
      /<slot><script type="application\/json">.*<\/script><script src="[^"]+"><\/script><\/slot>/s,
    );
    assert.ok(html.includes(`<script src="${clientUrl}"></script>`));
  });

  it("marks nothing: no attribute says where to draw", () => {
    assert.ok(!toHtml(drawn).includes("data-backtick"));
  });

  it("carries the bundle but not the client", () => {
    // The point of the content-addressed url: the page stays small because the
    // half that never changes is fetched once, not written into every page.
    assert.ok(toHtml(drawn).length < 400);
  });

  it("hands a template the island, and returns what it wrote", () => {
    const html = toHtml(
      drawn,
      (backtick) =>
        `<!doctype html><html><head><title>Todos</title></head>` +
        `<body><main>${backtick}</main></body></html>`,
    );
    assert.ok(html.includes("<title>Todos</title>"));
    assert.ok(html.includes(`<main><slot><script type="application/json">`));
    assert.ok(
      html.includes(`<script src="${clientUrl}"></script></slot></main>`),
    );
    // The default document is gone entirely, not wrapped around this one.
    assert.ok(!html.includes("viewport"));
  });

  it("writes the one island a page is", () => {
    assert.equal(
      toHtml(drawn, (backtick) => backtick),
      island(drawn),
    );
  });

  it("escapes a closing script tag in the bundle", async () => {
    // A `</script` ends a script element wherever it stands, data block or not.
    const risky = await bundle(jsx("p", { children: "</script><img>" }));
    const html = toHtml(risky);
    assert.ok(!html.includes("</script><img>"));
    assert.ok(html.includes("\\u003c/script"));
  });
});

describe("island", () => {
  it("gives each bundle a container and scripts of its own", () => {
    // A document with more than one says so by placing them: nothing is shared
    // between two islands but the client file, which is one url either way.
    const page = `<body><section>${island(drawn)}</section><section>${island(other)}</section></body>`;
    assert.equal(
      page.split(`<script src="${clientUrl}"></script>`).length - 1,
      2,
    );
    assert.equal(page.split("<slot>").length - 1, 2);
    assert.ok(page.includes(`<section><slot><script type="application/json">`));
  });

  it("carries its own bundle and no other", () => {
    assert.ok(island(drawn).includes("hi"));
    assert.ok(!island(drawn).includes("there"));
    assert.ok(island(other).includes("there"));
  });
});
