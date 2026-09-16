import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Spliceable } from "@backtickjs/core";
import { evaluate } from "@backtickjs/web-testing";

// What `a[k]` does with a key of the wrong type.
//
// TypeScript reads a numeric string literal as a numeric index, so `coins["0"]`
// passes the typechecker — it is `5` in JavaScript, where an array is an object
// and every key is a string. Nothing coerces here, so the read has no meaning
// and says so. The reads the typechecker refuses are written anyway, under
// `@ts-expect-error`, since what the client does with them is the question.
//
// A key that is not a place the value has anything is the other case, and it
// stays `undefined`: `indexPastEnd` and `indexAbsent` pin that, and the two
// must not be told apart by the same rule.
describe("a read by key", () => {
  it("refuses a string where an array takes a number", async () => {
    await assert.rejects(
      evaluate(cs.lift(cs.const(cs.receiver([5, 31, 7])["0"]))),
      /an array is read by a number: this bundle produced "0"\./,
    );
  });

  it("refuses a string where a string takes a number", async () => {
    await assert.rejects(
      evaluate(cs.lift(cs.const(cs.receiver("abc")["0"]))),
      /a string is read by a number: this bundle produced "0"\./,
    );
  });

  it("refuses a number where an object takes a string", async () => {
    await assert.rejects(
      // @ts-expect-error: an object is read by a string
      evaluate(cs.lift(cs.const(cs.receiver({ x: 1 })[0]))),
      /an object is read by a string: this bundle produced 0\./,
    );
  });

  it("refuses a target that holds nothing by key at all", async () => {
    await assert.rejects(
      evaluate(cs.lift(cs.const(cs.receiver(7 as unknown as number[])[0]))),
      /only an array, a string or an object can be read by key/,
    );
  });

  // The other half of the rule, so the two cases are pinned together: a
  // well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads: Spliceable[] = [
      cs.lift(cs.const(cs.receiver([5, 31, 7])[9])),
      cs.lift(cs.const(cs.receiver([5, 31, 7])[1.5])),
      cs.lift(cs.const(cs.receiver([5, 31, 7])[-cs.number(1)])),
      cs.lift(cs.const(cs.receiver({ x: 1 } as {
    [key: string]: number;
})["y"])),
      cs.lift(cs.const(cs.receiver("abc")[9])),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
