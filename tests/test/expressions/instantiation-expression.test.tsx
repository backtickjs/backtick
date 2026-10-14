import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

const pair = cs`<T,>(value: T): [T, T] => [value, value]`;

// `f<T>`, a function given its type arguments without a call: a value.
describe("an instantiation expression", () => {
  it("names a script's own function", async () => {
    const value = await evaluate(cs`{
      function wrap<T>(value: T): T[] {
        return [value];
      }
      const wrapNumber = wrap<number>;
      return wrapNumber(1);
    }`);
    assert.deepEqual(value, [1]);
  });

  it("names a splice", async () => {
    const value = await evaluate(cs`{
      const pairString = $pair<string>;
      return pairString("a");
    }`);
    assert.deepEqual(value, ["a", "a"]);
  });
});
