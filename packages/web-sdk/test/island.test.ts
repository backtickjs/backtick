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
      island(drawn),
      /^<slot><script type="application\/json">.*<\/script><script src="[^"]+"><\/script><\/slot>$/s,
    );
    assert.ok(island(drawn).includes(`<script src="${clientUrl}"></script>`));
  });

  it("marks nothing: no attribute says where to draw", () => {
    assert.ok(!island(drawn).includes("data-backtick"));
  });

  it("draws in a slot, which costs no layout and needs no stylesheet", () => {
    assert.ok(island(drawn).startsWith("<slot>"));
    assert.ok(!island(drawn).includes("style"));
  });

  it("carries the bundle but not the client", () => {
    // The point of the content-addressed url: a page stays small because the
    // half that never changes is fetched once, not written into every page.
    assert.ok(island(drawn).length < 400);
  });

  it("gives each bundle a container and scripts of its own", () => {
    // A document with more than one says so by placing them: nothing is shared
    // between two islands but the client file, which is one url either way.
    const held = `<body><section>${island(drawn)}</section><section>${island(other)}</section></body>`;
    assert.equal(
      held.split(`<script src="${clientUrl}"></script>`).length - 1,
      2,
    );
    assert.equal(held.split("<slot>").length - 1, 2);
    assert.ok(held.includes(`<section><slot><script type="application/json">`));
  });

  it("carries its own bundle and no other", () => {
    assert.ok(island(drawn).includes("hi"));
    assert.ok(!island(drawn).includes("there"));
    assert.ok(island(other).includes("there"));
  });

  it("escapes a closing script tag in the bundle", async () => {
    // A `</script` ends a script element wherever it stands, data block or not.
    const risky = island(
      await bundle(jsx("p", { children: "</script><img>" })),
    );
    assert.ok(!risky.includes("</script><img>"));
    assert.ok(risky.includes("\\u003c/script"));
  });
});
