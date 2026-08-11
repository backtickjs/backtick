import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { clientUrl } from "../dist/browserClient.js";
import { jsx } from "../dist/jsx-runtime/index.js";
import { toHtml } from "../dist/toHtml.js";

const drawn = await bundle(jsx("p", { children: "hi" }));

describe("toHtml", () => {
  it("writes one element holding the bundle and then the client", () => {
    // The order is the whole of how the client finds its work: the block is the
    // element in front of it, and where to draw is the element they are in.
    const html = toHtml(drawn);
    assert.match(html, /^<!doctype html><html><head>/);
    assert.match(
      html,
      /<div><script type="application\/json">.*<\/script><script src="[^"]+"><\/script><\/div>/s,
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

  it("hands a template the block, and returns what it wrote", () => {
    const html = toHtml(
      drawn,
      (backtick) =>
        `<!doctype html><html><head><title>Todos</title></head>` +
        `<body><main>${backtick}</main></body></html>`,
    );
    assert.ok(html.includes("<title>Todos</title>"));
    assert.ok(html.includes(`<main><div><script type="application/json">`));
    assert.ok(
      html.includes(`<script src="${clientUrl}"></script></div></main>`),
    );
    // The default document is gone entirely, not wrapped around this one.
    assert.ok(!html.includes("viewport"));
  });

  it("escapes a closing script tag in the bundle", async () => {
    // A `</script` ends a script element wherever it stands, data block or not.
    const risky = await bundle(jsx("p", { children: "</script><img>" }));
    const html = toHtml(risky);
    assert.ok(!html.includes("</script><img>"));
    assert.ok(html.includes("\\u003c/script"));
  });
});
