import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs.lift((() => {
    let __cs_i = 0;
    for (;;) {
        if (__cs_i === 4) {
            break;
        }
        __cs_i = __cs_i + 1;
    }
    return __cs_i;
})()),
  );
});
