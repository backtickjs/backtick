import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";

// A script's own names and the client's globals, read where the checker sees
// them written another way: a shorthand, a type's `typeof`, a class's
// `extends`.
describe("a script's names, wherever they stand", () => {
  it("as a shorthand, its own and a global's", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          const x = 1;
          const both = { x, Math };
          return [both.x, both.Math.max(2, 3)];
        })`,
      ),
      [1, 3],
    );
  });

  it("in a type's `typeof`, and a class's `extends`", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          const start = { n: 1 };
          const copy: typeof start = { n: start.n + 1 };
          class Base {
            twice() {
              return copy.n * 2;
            }
          }
          class Child extends Base {}
          return [copy.n, new Child().twice()];
        })`,
      ),
      [2, 4],
    );
  });
});
