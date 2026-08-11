import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { island } from "../dist/island.js";
import { jsx } from "../dist/jsx-runtime/index.js";

const drawn = await bundle(jsx("p", { children: "hi" }));
const other = await bundle(jsx("p", { children: "there" }));

describe("island", () => {
  it("writes the bundle and then the element that draws it", () => {
    assert.match(
      island(drawn),
      /^<script type="application\/backtick\+json">.*<\/script><backtick-island><\/backtick-island>$/s,
    );
  });

  it("writes data and nothing that draws it", () => {
    // The document asks for the client itself, so how it is served, cached or
    // vouched for is the app's and nothing here has an opinion about it.
    const held = island(drawn);
    assert.ok(!held.includes("src="));
    assert.ok(!held.includes("_backtick"));
  });

  it("costs no more than the bundle it carries", () => {
    // Raw text in a script, so nothing about it is escaped for an attribute.
    const carried = /<script[^>]*>([\s\S]*?)<\/script>/.exec(
      island(drawn),
    )?.[1];
    assert.ok(carried !== undefined);
    assert.equal(carried.length, JSON.stringify(drawn).length);
    assert.deepEqual(JSON.parse(carried), drawn);
  });

  it("takes a type of its own, so an app's own json is not one of these", () => {
    assert.ok(!island(drawn).includes(`type="application/json"`));
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
