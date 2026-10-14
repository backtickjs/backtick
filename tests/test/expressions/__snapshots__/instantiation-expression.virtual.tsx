import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

const pair = cs.lift((() => <T,>(__cs_value: T): [T, T] => [__cs_value, __cs_value])());

// `f<T>`, a function given its type arguments without a call: a value.
describe("an instantiation expression", () => {
  it("names a script's own function", async () => {
    const value = await evaluate(cs.lift((() => {
      function __cs_wrap<T>(__cs_value: T): T[] {
        return [__cs_value];
      }
      const __cs_wrapNumber = __cs_wrap<number>;
      return __cs_wrapNumber(1);
    })()));
    assert.deepEqual(value, [1]);
  });

  it("names a splice", async () => {
    const value = await evaluate(cs.lift((() => {
      const __cs_pairString = (cs.splice((pair)))<string>;
      return __cs_pairString("a");
    })()));
    assert.deepEqual(value, ["a", "a"]);
  });
});
