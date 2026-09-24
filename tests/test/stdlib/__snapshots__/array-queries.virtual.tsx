import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Array members that answer a question about an array or build a new one,
// leaving it as it was. `reduceRight` takes its starting value, as `reduce`
// does.
it("arrayQueries", async (t) => {
  await snapshotCase(
    t,
    "arrayQueries",
    cs.lift((() => {
    const __cs_coins = [1, 2, 3, 4];
    return { at: [__cs_coins.at(0), __cs_coins.at(-1), __cs_coins.at(9)], every: __cs_coins.every(__cs_n => __cs_n > 0), some: __cs_coins.some(__cs_n => __cs_n > 3), findLast: __cs_coins.findLast(__cs_n => __cs_n < 3), findLastIndex: __cs_coins.findLastIndex(__cs_n => __cs_n < 3), flatMap: __cs_coins.flatMap(__cs_n => [__cs_n, __cs_n * 10]), reduceRight: __cs_coins.reduceRight((__cs_text, __cs_n) => __cs_text + __cs_n, ""), unchanged: __cs_coins };
})()),
  );
});
