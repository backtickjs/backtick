import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `++` and `--` step a variable by one. A prefix step answers the value after
// the step, and a postfix step the value before it — exactly, for a fraction
// too.
it("step", async (t) => {
  await snapshotCase(
    t,
    "step",
    cs.lift((() => {
    let __cs_total = 0;
    for (let __cs_i = 0; __cs_i < 3; __cs_i++) {
        __cs_total = cs.const(__cs_total + __cs_i);
    }
    let __cs_n = 0.1;
    const __cs_before = cs.const(__cs_n++);
    const __cs_after = cs.const(++__cs_n);
    const __cs_down = cs.const(__cs_n--);
    return cs.const([__cs_total, __cs_before, __cs_after, __cs_down, __cs_n]);
})()),
  );
});
