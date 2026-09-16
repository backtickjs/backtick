import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bare `return` exits an action early; the completion is null either way.
it("earlyReturn", async (t) => {
  await snapshotCase(
    t,
    "earlyReturn",
    cs`{
      let n = 0;
      if (n === 0) {
        return;
      }
      n = 1;
    }`,
  );
});
