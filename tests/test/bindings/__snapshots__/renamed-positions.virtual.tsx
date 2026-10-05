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
        cs.lift((() => (cs.splice((createRoot)))(() => {
          const __cs_x = 1;
          const __cs_both = { x: __cs_x, Math: cs.globalThis.Math };
          return [__cs_both.x, __cs_both.Math.max(2, 3)];
        }))()),
      ),
      [1, 3],
    );
  });

  it("in a type's `typeof`, and a class's `extends`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => (cs.splice((createRoot)))(() => {
          const __cs_start = { n: 1 };
          const __cs_copy: typeof __cs_start = { n: __cs_start.n + 1 };
          class __cs_Base {
            twice() {
              return __cs_copy.n * 2;
            }
          }
          class __cs_Child extends __cs_Base {}
          return [__cs_copy.n, new __cs_Child().twice()];
        }))()),
      ),
      [2, 4],
    );
  });
});
