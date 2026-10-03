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
        cs`$createRoot(() => {
          const a = 1;
          const key = "dyn";
          const counter = {
            a,
            count: 0,
            [key + "amic"]: true,
            bump() {
              this.count = this.count + 1;
              return this.count;
            },
            get double(): number {
              return this.count * 2;
            },
            set to(value: number) {
              this.count = value;
            },
          };
          counter.bump();
          counter.to = 5;
          return [counter.a, counter.dynamic, counter.bump(), counter.double];
        })`,
      ),
      [1, true, 6, 12],
    );
  });

  it("`?.[` and a chain mixing `?.` and `.`", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          const names = ["a"] as readonly string[] | null;
          const none = null as readonly string[] | null;
          const o = { inner: { z: 3 } } as { inner: { z: number } } | null;
          const empty = null as { inner: { z: number } } | null;
          return [names?.[0], none?.[0], o?.inner.z, empty?.inner.z];
        })`,
      ),
      ["a", undefined, 3, undefined],
    );
  });
});
