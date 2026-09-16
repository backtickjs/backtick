import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?` marks an optional parameter — sugar for `T | undefined`. A caller may
// pass `undefined` where the argument is not supplied; `null` is a value of
// its own and not accepted here.
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
      supplied: $callIfGiven($double),
      fallback: $callIfGiven(undefined),
    })`,
  );
});
