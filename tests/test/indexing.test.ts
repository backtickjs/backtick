import type { ClientUnknown } from "@backtickjs/core";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type Bundle } from "@backtickjs/bundler";
import { evaluate } from "@backtickjs/test-vm";

// What `a[k]` does with a key of the wrong type.
//
// Written by hand because the typechecker no longer stops these: TypeScript
// reads a numeric string literal as a numeric index, so `coins["0"]` passes
// there — it is `5` in JavaScript, where an array is an object and every key is
// a string. Nothing coerces here, so the read has no meaning and says so.
//
// A key that is not a place the value has anything is the other case, and it
// stays `undefined`: `index-past-end` and `index-absent` in `valid/` pin that,
// and the two must not be told apart by the same rule.
const reads = (target: unknown, key: unknown) =>
  ({
    functions: {
      "0": [
        "=>",
        [],
        ["{}", [["return", ["[]", target as never, key as never]]]],
      ],
    },
    root: ["()", ["fn", "0"], []],
  }) as unknown as Bundle<ClientUnknown>;

describe("a read by key", () => {
  it("refuses a string where an array takes a number", () => {
    assert.throws(
      () => evaluate(reads(["arr", [5, 31, 7]], "0")),
      /an array is read by a number: this bundle produced "0"\./,
    );
  });

  it("refuses a string where a string takes a number", () => {
    assert.throws(
      () => evaluate(reads("abc", "0")),
      /a string is read by a number: this bundle produced "0"\./,
    );
  });

  it("refuses a number where an object takes a string", () => {
    assert.throws(
      () => evaluate(reads({ x: 1 }, 0)),
      /an object is read by a string: this bundle produced 0\./,
    );
  });

  it("refuses a target that holds nothing by key at all", () => {
    assert.throws(
      () => evaluate(reads(7, 0)),
      /only an array, a string or an object can be read by key/,
    );
  });

  // The other half of the rule, so the two cases are pinned together: a
  // well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", () => {
    assert.equal(evaluate(reads(["arr", [5, 31, 7]], 9)), undefined);
    assert.equal(evaluate(reads(["arr", [5, 31, 7]], 1.5)), undefined);
    assert.equal(evaluate(reads(["arr", [5, 31, 7]], -1)), undefined);
    assert.equal(evaluate(reads({ x: 1 }, "y")), undefined);
    assert.equal(evaluate(reads("abc", 9)), undefined);
  });
});
