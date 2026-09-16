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
    cs`{
      let last: () => number = () => 0;
      for (let i = 0; i < 3; i = i + 1) {
        last = () => i;
      }
      return last();
    }`,
  );
});
