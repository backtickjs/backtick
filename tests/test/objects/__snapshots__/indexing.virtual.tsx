import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Spliceable } from "@backtickjs/core";
import { evaluate } from "@backtickjs/web-testing";

// What `a[k]` does with a key of another type: what JavaScript does.
describe("a read by key", () => {
  it("reads a key of another type as JavaScript does", async () => {
    assert.equal(await evaluate(cs.lift([5, 31, 7]["0"])), 5);
    assert.equal(await evaluate(cs.lift("abc"["0"])), "a");
    // @ts-expect-error: an object's type names its keys
    assert.equal(await evaluate(cs.lift({ x: 1 }[0])), undefined);
    assert.equal(await evaluate(cs.lift((7 as unknown as number[])[0])), undefined);
  });

  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads: Spliceable[] = [
      cs.lift([5, 31, 7][9]),
      cs.lift([5, 31, 7][1.5]),
      cs.lift([5, 31, 7][-1]),
      cs.lift(({ x: 1 } as {
    [key: string]: number;
})["y"]),
      cs.lift("abc"[9]),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
