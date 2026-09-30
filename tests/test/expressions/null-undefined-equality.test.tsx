import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { draw } from "@backtickjs/solid-js/testing";
import { createRoot } from "solid-js";

// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(createRoot(await draw(cs`() => null === null`)), true);
    assert.equal(createRoot(await draw(cs`() => undefined === undefined`)), true);
  });

  it("are not equal to each other", async () => {
    assert.equal(createRoot(await draw(cs`() => null !== undefined`)), true);
    assert.equal(createRoot(await draw(cs`() => null === undefined`)), false);
  });

  // The same holds wherever the value came from: a splice, or a read past
  // the end of an array.
  it("compare the same when they arrive another way", async () => {
    const nothing: number | undefined = undefined;
    const empty = null;
    assert.deepEqual(
      createRoot(
        await draw(cs`() => {
          const names = ["a"];
          return [
            $nothing === undefined,
            $nothing !== null,
            $empty === null,
            $empty !== undefined,
            names[1] === undefined,
            names[1] !== null,
          ];
        }`),
      ),
      [true, true, true, true, true, true],
    );
  });
});
