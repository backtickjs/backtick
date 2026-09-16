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
    cs`{
      const prices = [4.5, 3.25, 2];
      const total = prices.reduce((sum, price) => sum + price, 0);
      const names = ["a", "b", "c"];
      const joined = names.reduce((all, one, index) => all + index + one, "");
      const empty: number[] = [];
      return (
        total.toFixed(2) +
        "|" +
        joined +
        "|" +
        empty.reduce((sum, one) => sum + one, 0)
      );
    }`,
  );
});
