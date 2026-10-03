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
        cs`$createRoot(() => {
          {
            var late = 1;
          }
          let total = 0;
          for (var i = 0; i < 3; i = i + 1) {
            total = total + i;
          }
          return late + " " + total + " " + i;
        })`,
      ),
      "1 3 3",
    );
  });

  it("`let` without an initializer, and several declarators", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          let x;
          const a = 1,
            b = 2;
          return [x, a + b];
        })`,
      ),
      [undefined, 3],
    );
  });

  it("a labeled `break` and `continue`", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          const seen: string[] = [];
          outer: for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (j === 1) continue outer;
              if (i === 2) break outer;
              seen.push(i + ":" + j);
            }
          }
          return seen;
        })`,
      ),
      ["0:0", "1:0"],
    );
  });

  it("`finally`, which runs however the block ends", async () => {
    assert.deepEqual(
      await evaluate(
        cs`$createRoot(() => {
          const log: string[] = [];
          const run = (fail: boolean) => {
            try {
              if (fail) throw new Error("no");
              log.push("tried");
            } catch (error) {
              log.push("caught");
            } finally {
              log.push("finally");
            }
          };
          run(false);
          run(true);
          const overridden = (() => {
            try {
              return 1;
            } finally {
              return 2;
            }
          })();
          return [log, overridden];
        })`,
      ),
      [["tried", "finally", "caught", "finally"], 2],
    );
  });

  it("a destructured `catch` binding", async () => {
    assert.equal(
      await evaluate(
        cs`$createRoot(() => {
          try {
            throw new Error("boom");
          } catch ({ message }: any) {
            return message;
          }
        })`,
      ),
      "boom",
    );
  });
});
