import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";

// Destructuring, in a declaration and in parameters, as JavaScript reads it.
describe("destructuring", () => {
  it("arrays and objects, nested, with defaults and rest", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          const [__cs_a, , __cs_b = 5, ...__cs_others] = [1, 2, undefined, 4, 6];
          const {
            x: __cs_x,
            y: { z: __cs_z },
            w: __cs_w = 7,
            ...__cs_more
          } = { x: 1, y: { z: 2 }, extra: 3 };
          return [__cs_a, __cs_b, __cs_others, __cs_x, __cs_z, __cs_w, __cs_more];
        }))()),
      ),
      [1, 5, [4, 6], 1, 2, 7, { extra: 3 }],
    );
  });

  it("parameters: rest, defaults and patterns", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          const __cs_sum = (...__cs_values: number[]) =>
            __cs_values.reduce((__cs_t, __cs_v) => __cs_t + __cs_v, 0);
          const __cs_scaled = (__cs_n: number, __cs_by: number = 2) => __cs_n * __cs_by;
          const __cs_named = ({ first: __cs_first, last: __cs_last }: { first: string; last: string }) =>
            __cs_first + " " + __cs_last;
          const __cs_pair = ([__cs_left, __cs_right]: [number, number]) => __cs_left - __cs_right;
          return [
            __cs_sum(1, 2, 3),
            __cs_scaled(4),
            __cs_scaled(4, 3),
            __cs_named({ first: "A", last: "B" }),
            __cs_pair([5, 2]),
          ];
        }))()),
      ),
      [6, 8, 12, "A B", 3],
    );
  });
});
