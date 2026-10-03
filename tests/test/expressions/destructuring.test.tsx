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
        cs`$createRoot(() => {
          const [a, , b = 5, ...others] = [1, 2, undefined, 4, 6];
          const {
            x,
            y: { z },
            w = 7,
            ...more
          } = { x: 1, y: { z: 2 }, extra: 3 };
          return [a, b, others, x, z, w, more];
        })`,
      ),
      [1, 5, [4, 6], 1, 2, 7, { extra: 3 }],
    );
  });

  it("parameters: rest, defaults and patterns", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          const sum = (...values: number[]) =>
            values.reduce((t, v) => t + v, 0);
          const scaled = (n: number, by: number = 2) => n * by;
          const named = ({ first, last }: { first: string; last: string }) =>
            first + " " + last;
          const pair = ([left, right]: [number, number]) => left - right;
          return [
            sum(1, 2, 3),
            scaled(4),
            scaled(4, 3),
            named({ first: "A", last: "B" }),
            pair([5, 2]),
          ];
        })`,
      ),
      [6, 8, 12, "A B", 3],
    );
  });
});
