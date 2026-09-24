import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
it("arrayIndex", async (t) => {
  await snapshotCase(
    t,
    "arrayIndex",
    cs.lift((() => {
    const __cs_coins = [5, 31, 7];
    let __cs_total = 0;
    for (let __cs_i = 0; __cs_i < __cs_coins.length; __cs_i = __cs_i + 1) {
        __cs_total = __cs_total + __cs_coins[__cs_i];
    }
    return __cs_total;
})()),
  );
});
