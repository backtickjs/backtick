import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A builtin is a value, not only a callee. The compiler folds `Math.floor`
// into one whole name the client answers — there is no `Math` for a read to
// yield — and that name stands wherever a value does: bound to a variable,
// and handed to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
it("builtinAsValue", async (t) => {
  await snapshotCase(
    t,
    "builtinAsValue",
    cs.lift((() => {
    const __cs_floor = Math.floor;
    const __cs_apply = (__cs_f: (n: number) => number, __cs_n: number) => __cs_f(__cs_n);
    return __cs_floor(3.5) + __cs_apply(Math.ceil, 3.5);
})()),
  );
});
