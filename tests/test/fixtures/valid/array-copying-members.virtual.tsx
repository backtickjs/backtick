import { cs } from "@backtickjs/core";

// The copying members: each answers with a new array and leaves the one it was
// given alone, which is what lets an array be a value here. `sort`, `reverse`
// and `splice` — the ones that write into the array instead — are absent.
export default cs.lift((() => {
    const __cs_rows = cs.const([3, 1, 2]);
    const __cs_sorted = cs.const(cs.receiver(__cs_rows).toSorted((__cs_a, __cs_b) => __cs_a - __cs_b));
    const __cs_reversed = cs.const(cs.receiver(__cs_rows).toReversed());
    const __cs_spliced = cs.const(cs.receiver(__cs_rows).toSpliced(1, 1));
    const __cs_inserted = cs.const(cs.receiver(__cs_rows).toSpliced(1, 0, 9));
    return cs.const(cs.receiver(__cs_sorted).join(",") + "|" + cs.receiver(__cs_reversed).join(",") + "|" + cs.receiver(__cs_spliced).join(",") + "|" + cs.receiver(__cs_inserted).join(",") + "|" + cs.receiver(__cs_rows).join(","));
})());
