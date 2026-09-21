import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A negative literal is written as one, and reaches the wire as one: `-1` is
// a prefix operator on `1` in TypeScript's AST and in this one, and a number
// on the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
it("negation", async (t) => {
  await snapshotCase(
    t,
    "negation",
    cs.lift(cs.const((__cs_count: number) => {
    const __cs_floor = cs.const(-cs.number(1));
    const __cs_step = cs.const(-cs.number(__cs_count));
    return cs.const(__cs_floor + __cs_step + -cs.number(2));
})),
  );
});

// `-0` stays a negation on the wire: JSON writes the number `-0` as `0`.
it("negativeZero", async (t) => {
  await snapshotCase(t, "negativeZero", cs.lift((() => {
    return cs.const(1 / -cs.number(0));
})()));
});
