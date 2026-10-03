import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";

// Statements a script writes as any JavaScript function would, each running as
// the language says.
describe("statements", () => {
  it("`var`, scoped to the function, and in a `for` header", async () => {
    assert.equal(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          {
            var __cs_late = 1;
          }
          let __cs_total = 0;
          for (var __cs_i = 0; __cs_i < 3; __cs_i = __cs_i + 1) {
            __cs_total = __cs_total + __cs_i;
          }
          return __cs_late + " " + __cs_total + " " + __cs_i;
        }))()),
      ),
      "1 3 3",
    );
  });

  it("`let` without an initializer, and several declarators", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          let __cs_x;
          const __cs_a = 1,
            __cs_b = 2;
          return [__cs_x, __cs_a + __cs_b];
        }))()),
      ),
      [undefined, 3],
    );
  });

  it("a labeled `break` and `continue`", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          const __cs_seen: string[] = [];
          outer: for (let __cs_i = 0; __cs_i < 3; __cs_i++) {
            for (let __cs_j = 0; __cs_j < 3; __cs_j++) {
              if (__cs_j === 1) continue outer;
              if (__cs_i === 2) break outer;
              __cs_seen.push(__cs_i + ":" + __cs_j);
            }
          }
          return __cs_seen;
        }))()),
      ),
      ["0:0", "1:0"],
    );
  });

  it("`finally`, which runs however the block ends", async () => {
    assert.deepEqual(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          const __cs_log: string[] = [];
          const __cs_run = (__cs_fail: boolean) => {
            try {
              if (__cs_fail) throw new cs.globalThis.Error("no");
              __cs_log.push("tried");
            } catch (__cs_error) {
              __cs_log.push("caught");
            } finally {
              __cs_log.push("finally");
            }
          };
          __cs_run(false);
          __cs_run(true);
          const __cs_overridden = (() => {
            try {
              return 1;
            } finally {
              return 2;
            }
          })();
          return [__cs_log, __cs_overridden];
        }))()),
      ),
      [["tried", "finally", "caught", "finally"], 2],
    );
  });

  it("a destructured `catch` binding", async () => {
    assert.equal(
      await evaluate(
        cs.lift((() => cs.splice((createRoot))(() => {
          try {
            throw new cs.globalThis.Error("boom");
          } catch ({ message: __cs_message }: any) {
            return __cs_message;
          }
        }))()),
      ),
      "boom",
    );
  });
});
