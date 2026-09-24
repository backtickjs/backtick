import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The copying members: each answers with a new array and leaves the one it
// was given alone, which is what lets an array be a value here. `sort`,
// `reverse` and `splice` — the ones that write into the array instead — are
// absent.
it("arrayCopyingMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayCopyingMembers",
    cs.lift((() => {
    const __cs_rows = [3, 1, 2];
    const __cs_sorted = __cs_rows.toSorted((__cs_a, __cs_b) => __cs_a - __cs_b);
    const __cs_reversed = __cs_rows.toReversed();
    const __cs_spliced = __cs_rows.toSpliced(1, 1);
    const __cs_inserted = __cs_rows.toSpliced(1, 0, 9);
    return __cs_sorted.join(",") + "|" + __cs_reversed.join(",") + "|" + __cs_spliced.join(",") + "|" + __cs_inserted.join(",") + "|" + __cs_rows.join(",");
})()),
  );
});
