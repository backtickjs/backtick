import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";

// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(await evaluate(cs.lift(cs.splice((createRoot))(() => null === null))), true);
    assert.equal(
      await evaluate(cs.lift(cs.splice((createRoot))(() => undefined === undefined))),
      true,
    );
  });

  it("are not equal to each other", async () => {
    assert.equal(
      await evaluate(cs.lift(cs.splice((createRoot))(() => null !== undefined))),
      true,
    );
    assert.equal(
      await evaluate(cs.lift(cs.splice((createRoot))(() => null === undefined))),
      false,
    );
  });

  // The same holds wherever the value came from: a splice, or a read past
  // the end of an array.
  it("compare the same when they arrive another way", async () => {
    const nothing: number | undefined = undefined;
    const empty = null;
    assert.deepEqual(
      await evaluate(cs.lift(cs.splice((createRoot))(() => {
    const __cs_names = ["a"];
    return [cs.splice((nothing)) === undefined, cs.splice((nothing)) !== null, cs.splice((empty)) === null, cs.splice((empty)) !== undefined, __cs_names[1] === undefined, __cs_names[1] !== null];
}))),
      [true, true, true, true, true, true],
    );
  });
});
