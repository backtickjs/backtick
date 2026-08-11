import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { clientUrl } from "../dist/browserClient.js";
import { island } from "../dist/island.js";
import { jsx } from "../dist/jsx-runtime/index.js";

const drawn = await bundle(jsx("p", { children: "hi" }));
const other = await bundle(jsx("p", { children: "there" }));

describe("island", () => {
  it("writes the bundle and then the client, in that order", () => {
    // The order is the whole of how the client finds its work: the bundle is
    // the element in front of it, and where to draw is what they are both in.
    assert.match(
      island(drawn, clientUrl),
      /^<script type="application\/json">.*<\/script><script defer src="[^"]+"><\/script>$/s,
    );
    assert.ok(
      island(drawn, clientUrl).includes(
        `<script defer src="${clientUrl}"></script>`,
      ),
    );
  });

  it("marks nothing: no attribute says where to draw", () => {
    assert.ok(!island(drawn, clientUrl).includes("data-backtick"));
  });

  it("waits for the document to finish parsing before it draws", () => {
    // Without `defer` the parser stops at every island and draws it against a
    // half-built document.
    assert.ok(island(drawn, clientUrl).includes("<script defer src="));
  });

  it("wraps what it draws in nothing at all", () => {
    assert.ok(island(drawn, clientUrl).startsWith("<script "));
    assert.ok(!island(drawn, clientUrl).includes("style"));
  });

  it("asks for the client where it is told to", () => {
    // A document served under somebody else's prefix asks relatively, and says
    // so rather than rewriting what came back.
    const asked = `.${clientUrl}`;
    const held = island(drawn, asked);
    assert.ok(held.includes(`<script defer src="${asked}"></script>`));
    assert.ok(!held.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("carries the bundle but not the client", () => {
    // The point of the content-addressed url: a page stays small because the
    // half that never changes is fetched once, not written into every page.
    assert.ok(island(drawn, clientUrl).length < 400);
  });

  it("gives each bundle a container and scripts of its own", () => {
    // A document with more than one says so by placing them: nothing is shared
    // between two islands but the client file, which is one url either way.
    const held = `<body><section>${island(drawn, clientUrl)}</section><section>${island(other, clientUrl)}</section></body>`;
    assert.equal(
      held.split(`<script defer src="${clientUrl}"></script>`).length - 1,
      2,
    );
    assert.equal(held.split('<script type="application/json">').length - 1, 2);
    assert.ok(held.includes(`<section><script type="application/json">`));
  });

  it("carries its own bundle and no other", () => {
    assert.ok(island(drawn, clientUrl).includes("hi"));
    assert.ok(!island(drawn, clientUrl).includes("there"));
    assert.ok(island(other, clientUrl).includes("there"));
  });

  it("escapes a closing script tag in the bundle", async () => {
    // A `</script` ends a script element wherever it stands, data block or not.
    const risky = island(
      await bundle(jsx("p", { children: "</script><img>" })),
      clientUrl,
    );
    assert.ok(!risky.includes("</script><img>"));
    assert.ok(risky.includes("\\u003c/script"));
  });
});
