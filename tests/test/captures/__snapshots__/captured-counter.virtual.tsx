import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
it("capturedCounter", async (t) => {
  await snapshotCase(
    t,
    "capturedCounter",
    cs.lift((() => {
      let __cs_count = 0;
      const __cs_bump = () => {
        __cs_count = __cs_count + 1;
        return __cs_count;
      };
      return __cs_bump() + __cs_bump();
    })()),
  );
});
