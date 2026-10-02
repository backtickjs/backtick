import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs.lift((() => (__cs_name?: string) => {
    return __cs_name?.concat("!");
})());

// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.lift((() => () => 2)());

const callIfGiven = cs.lift((() => (__cs_cb?: () => number) => {
    return __cs_cb?.() ?? 0;
})());

it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.lift((() => ({ named: cs.splice((greet))("hi"), explicit: cs.splice((greet))(undefined), omitted: cs.splice((greet))(), supplied: cs.splice((callIfGiven))(cs.splice((double))), fallback: cs.splice((callIfGiven))(undefined), omittedCallback: cs.splice((callIfGiven))() }))()),
  );
});
