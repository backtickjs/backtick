import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";

// A spliced `undefined` crosses as itself, written `undefined`: alone, as an
// object's member, its key kept, and as an array's element.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing: number | undefined = undefined;
    assert.equal(await evaluate(cs.lift((() => (cs.splice((createRoot)))(() => (cs.splice((nothing)))))())), undefined);
  });

  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = await evaluate(cs.lift((() => (cs.splice((createRoot)))(() => (cs.splice((data)))))()));
    assert.deepEqual(arrived, { missing: undefined, kept: 1 });
    assert.ok("missing" in (arrived as object));
  });

  it("stays undefined in an array", async () => {
    const data = [1, undefined, 3];
    assert.deepEqual(await evaluate(cs.lift((() => (cs.splice((createRoot)))(() => (cs.splice((data)))))())), [
      1,
      undefined,
      3,
    ]);
  });

  it("is written as `undefined`", async () => {
    const bundle = await bundler.build({
      input: [undefined],
      packageVersions: {},
    });
    const { code } = bundle.generate({ format: "es" });
    assert.match(code, /\[undefined\]/);
  });
});
