import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { draw } from "@backtickjs/solid-js/testing";
import { createRoot } from "solid-js";

// A spliced `undefined` crosses as the bundle's `undef` node, since JSON has
// no form for it: dropped from an object and turned into `null` in an array.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing: number | undefined = undefined;
    assert.equal(createRoot(await draw(cs.lift(cs.splice((nothing))))), undefined);
  });

  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = createRoot(await draw(cs.lift(cs.splice((data)))));
    assert.deepEqual(arrived, { missing: undefined, kept: 1 });
    assert.ok("missing" in (arrived as object));
  });

  it("stays undefined in an array", async () => {
    const data = [1, undefined, 3];
    assert.deepEqual(createRoot(await draw(cs.lift(cs.splice((data))))), [1, undefined, 3]);
  });

  it("is written as `void 0`", async () => {
    const { code } = await bundler.run([undefined]);
    assert.match(code, /\[void 0\]/);
  });
});
