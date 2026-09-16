import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(
    t,
    "forLoop",
    cs`{
      let total = 0;
      for (let i = 0; i < 5; i = i + 1) {
        total = total + i;
      }
      return total;
    }`,
  );
});
