import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";

// A script may bind `undefined`, as a JavaScript function may: in its scope the
// name is that binding, and outside it `undefined` is the value it always is.
describe("a script's own `undefined`", () => {
  it("is what it was bound to, in its scope", async () => {
    assert.equal(
      await evaluate(
        cs`$createRoot(() => {
          const undefined = 1;
          return undefined;
        })`,
      ),
      1,
    );
    assert.equal(
      await evaluate(
        cs`$createRoot(() => ((undefined: number) => undefined + 1)(2))`,
      ),
      3,
    );
  });

  it("leaves `undefined` the value outside it", async () => {
    assert.equal(
      await evaluate(
        cs`$createRoot(() => {
          {
            const undefined = 1;
          }
          return undefined;
        })`,
      ),
      undefined,
    );
  });
});
