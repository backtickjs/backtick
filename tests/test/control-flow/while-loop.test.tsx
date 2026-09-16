import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("whileLoop", async (t) => {
  await snapshotCase(
    t,
    "whileLoop",
    cs`{
      let i = 0;
      let total = 0;
      while (i < 5) {
        total = total + i;
        if (i === 3) {
          return total;
        }
        i = i + 1;
      }
      return total;
    }`,
  );
});
