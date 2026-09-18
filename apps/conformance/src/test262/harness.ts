import { cs } from "@backtickjs/core";
import type { ClientValue } from "@backtickjs/core";

// What Test262's `assert.js`, `sta.js` and `compareArray.js` give a case,
// written in client script: the harness is JavaScript a client may not run, so
// it is prepended as bindings to these instead of as source.
//
// A failure throws text, which is what a verdict shows.

// SameValue: `===`, except that NaN is itself and 0 is not -0.
const same = cs`(a: ClientValue, b: ClientValue) => {
  if (a === b) {
    return a !== 0 || 1 / (a as number) === 1 / (b as number);
  }
  return a !== a && b !== b;
}`;

const show = cs`(value: ClientValue) =>
  value === 0 && 1 / (value as number) < 0
    ? "-0"
    : (JSON.stringify(value) ?? "undefined")`;

export const compareArray = cs`(
  actual: readonly ClientValue[],
  expected: readonly ClientValue[],
) => {
  if (actual.length !== expected.length) {
    return false;
  }
  for (let i = 0; i < actual.length; i = i + 1) {
    if (!$same(actual[i], expected[i])) {
      return false;
    }
  }
  return true;
}`;

/**
 * A case's `throw new Test262Error(message)` is written without `new`: what it
 * makes is the harness's business, not what the case is testing.
 */
export const Test262Error = cs`(message?: string) =>
  "Test262Error: " + (message ?? "")`;

/**
 * `assert(value)` is written `assert.ok(value)`: a function that also has
 * members is not something a client script can make.
 *
 * `throws` takes any throw: a case naming a constructor other than
 * `Test262Error` names one client script has not got, and is refused first.
 */
export const assert = cs`({
  ok: (value: ClientValue, message?: string) => {
    if (value !== true) {
      throw "Expected true but got " + $show(value) + ". " + (message ?? "");
    }
  },
  sameValue: (actual: ClientValue, expected: ClientValue, message?: string) => {
    if (!$same(actual, expected)) {
      throw (
        "Expected SameValue(" +
        $show(actual) +
        ", " +
        $show(expected) +
        ") to be true. " +
        (message ?? "")
      );
    }
  },
  notSameValue: (
    actual: ClientValue,
    unexpected: ClientValue,
    message?: string,
  ) => {
    if ($same(actual, unexpected)) {
      throw (
        "Expected SameValue(" +
        $show(actual) +
        ", " +
        $show(unexpected) +
        ") to be false. " +
        (message ?? "")
      );
    }
  },
  throws: (expected: ClientValue, run: () => ClientValue, message?: string) => {
    let threw = false;
    try {
      const returned = run();
    } catch (error) {
      threw = true;
    }
    if (!threw) {
      throw "Expected an exception to be thrown. " + (message ?? "");
    }
  },
  compareArray: (
    actual: readonly ClientValue[],
    expected: readonly ClientValue[],
    message?: string,
  ) => {
    if (!$compareArray(actual, expected)) {
      throw (
        "Expected " +
        $show(actual) +
        " and " +
        $show(expected) +
        " to have the same contents. " +
        (message ?? "")
      );
    }
  },
})`;
