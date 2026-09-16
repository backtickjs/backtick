import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
it("capturedCounter", async (t) => {
  await snapshotCase(
    t,
    "capturedCounter",
    cs`{
      let count = 0;
      const bump = () => {
        count = count + 1;
        return count;
      };
      return bump() + bump();
    }`,
  );
});
