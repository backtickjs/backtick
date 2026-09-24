import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3
// the loop stopped at.
it("forPerTurnBinding", async (t) => {
  await snapshotCase(
    t,
    "forPerTurnBinding",
    cs.lift((() => {
    let __cs_last: () => number = () => 0;
    for (let __cs_i = 0; __cs_i < 3; __cs_i = __cs_i + 1) {
        __cs_last = () => __cs_i;
    }
    return __cs_last();
})()),
  );
});
