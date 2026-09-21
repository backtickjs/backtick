import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `++` and `--` step a variable by one. A prefix step answers the value after
// the step, and a postfix step the value before it — exactly, for a fraction
// too.
it("step", async (t) => {
  await snapshotCase(
    t,
    "step",
    cs`{
      let total = 0;
      for (let i = 0; i < 3; i++) {
        total = total + i;
      }
      let n = 0.1;
      const before = n++;
      const after = ++n;
      const down = n--;
      return [total, before, after, down, n];
    }`,
  );
});
