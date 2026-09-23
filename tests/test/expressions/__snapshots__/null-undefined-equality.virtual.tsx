import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "@backtickjs/web-testing";

// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(await evaluate(cs.lift(cs.const(null === null))), true);
    assert.equal(await evaluate(cs.lift(cs.const(undefined === undefined))), true);
  });

  it("are not equal to each other", async () => {
    assert.equal(await evaluate(cs.lift(cs.const(null !== undefined))), true);
    assert.equal(await evaluate(cs.lift(cs.const(null === undefined))), false);
  });

  // The same holds wherever the value came from: a splice, or a read past
  // the end of an array.
  it("compare the same when they arrive another way", async () => {
    const nothing: number | undefined = undefined;
    const empty = null;
    assert.deepEqual(
      await evaluate(cs.lift((() => {
    const __cs_names = cs.const(["a"]);
    return cs.const([(cs.splice((nothing)) satisfies typeof cs.ClientUnknown) === undefined, (cs.splice((nothing)) satisfies typeof cs.ClientUnknown) !== null, (cs.splice((empty)) satisfies typeof cs.ClientUnknown) === null, (cs.splice((empty)) satisfies typeof cs.ClientUnknown) !== undefined, __cs_names[1] === undefined, __cs_names[1] !== null]);
})())),
      [true, true, true, true, true, true],
    );
  });
});
