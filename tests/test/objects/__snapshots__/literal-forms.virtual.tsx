import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";

// An object literal's every form, and optional access, as JavaScript reads
// them.
describe("object literals", () => {
  it("shorthand, methods, accessors, computed keys and `this`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          const __cs_a = 1;
          const __cs_key = "dyn";
          const __cs_counter = {
            a: __cs_a,
            count: 0,
            [__cs_key + "amic"]: true,
            bump() {
              this.count = this.count + 1;
              return this.count;
            },
            get double(): number {
              return this.count * 2;
            },
            set to(__cs_value: number) {
              this.count = __cs_value;
            },
          };
          __cs_counter.bump();
          __cs_counter.to = 5;
          return [__cs_counter.a, __cs_counter.dynamic, __cs_counter.bump(), __cs_counter.double];
        }))()),
      ),
      [1, true, 6, 12],
    );
  });

  it("`?.[` and a chain mixing `?.` and `.`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          const __cs_names = ["a"] as readonly string[] | null;
          const __cs_none = null as readonly string[] | null;
          const __cs_o = { inner: { z: 3 } } as { inner: { z: number } } | null;
          const __cs_empty = null as { inner: { z: number } } | null;
          return [__cs_names?.[0], __cs_none?.[0], __cs_o?.inner.z, __cs_empty?.inner.z];
        }))()),
      ),
      ["a", undefined, 3, undefined],
    );
  });
});
