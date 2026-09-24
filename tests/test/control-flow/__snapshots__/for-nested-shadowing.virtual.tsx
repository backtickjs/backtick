import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Nested headers reusing a name, and a body that shadows the header's own:
// the update still means the header's binding, because names resolve to their
// binding before anything is lowered.
it("forNestedShadowing", async (t) => {
  await snapshotCase(
    t,
    "forNestedShadowing",
    cs.lift((() => {
    let __cs_out = "";
    for (let __cs_i = 0; __cs_i < 2; __cs_i = __cs_i + 1) {
        const __cs_i = "-";
        for (let __cs_j = 0; __cs_j < 2; __cs_j = __cs_j + 1) {
            __cs_out = __cs_out + __cs_i + __cs_j;
        }
    }
    return __cs_out;
})()),
  );
});
