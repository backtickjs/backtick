import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.lift((() => {
    const __cs_x = cs.const(0);
    return cs.const(cs.splice(cs.lift(cs.const(__cs_x))) satisfies typeof cs.ClientUnknown);
})()),
  );
});
