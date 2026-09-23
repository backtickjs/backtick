import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Where the two rules part company, pinned so a client implementer can see
// it: `names[9]` types as `string`, because TypeScript's indexed access says
// the element type, and reads as `undefined`, because the runtime read is total.
// Nothing faults; the type simply doesn't mention the floor under it.
it("indexPastEnd", async (t) => {
  await snapshotCase(
    t,
    "indexPastEnd",
    cs.lift((() => {
    const __cs_names = cs.const(["zero", "one"]);
    return cs.const(__cs_names[9]);
})()),
  );
});
