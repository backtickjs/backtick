import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs`(name?: string) => {
  return name?.concat("!");
}`;

// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs`() => 2`;

const callIfGiven = cs`(cb?: () => number) => {
  return cb?.() ?? 0;
}`;

it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs`({
      named: $greet("hi"),
      explicit: $greet(undefined),
      omitted: $greet(),
      supplied: $callIfGiven($double),
      fallback: $callIfGiven(undefined),
      omittedCallback: $callIfGiven(),
    })`,
  );
});
