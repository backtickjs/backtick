import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs`{
      let i = 0;
      for (;;) {
        if (i === 4) {
          break;
        }
        i = i + 1;
      }
      return i;
    }`,
  );
});
