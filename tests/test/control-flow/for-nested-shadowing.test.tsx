import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Nested headers reusing a name, and a body that shadows the header's own:
// the update still means the header's binding, because names resolve to their
// binding before anything is lowered.
it("forNestedShadowing", async (t) => {
  await snapshotCase(
    t,
    "forNestedShadowing",
    cs`{
      let out = "";
      for (let i = 0; i < 2; i = i + 1) {
        const i = "-";
        for (let j = 0; j < 2; j = j + 1) {
          out = out + i + j;
        }
      }
      return out;
    }`,
  );
});
