import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
it("arrayIndex", async (t) => {
  await snapshotCase(
    t,
    "arrayIndex",
    cs`{
      const coins = [5, 31, 7];
      let total = 0;
      for (let i = 0; i < coins.length; i = i + 1) {
        total = total + coins[i];
      }
      return total;
    }`,
  );
});
