import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `reduce` takes its initial value, where the standard library lets it be
// left out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
it("arrayReduce", async (t) => {
  await snapshotCase(
    t,
    "arrayReduce",
    cs.lift((() => {
    const __cs_prices = cs.const([4.5, 3.25, 2]);
    const __cs_total = cs.const(cs.receiver(__cs_prices).reduce((__cs_sum, __cs_price) => __cs_sum + __cs_price, 0));
    const __cs_names = cs.const(["a", "b", "c"]);
    const __cs_joined = cs.const(cs.receiver(__cs_names).reduce((__cs_all, __cs_one, __cs_index) => __cs_all + __cs_index + __cs_one, ""));
    const __cs_empty: number[] = cs.const([]);
    return cs.const(cs.receiver(__cs_total).toFixed(2) + "|" + __cs_joined + "|" + cs.receiver(__cs_empty).reduce((__cs_sum, __cs_one) => __cs_sum + __cs_one, 0));
})()),
  );
});
