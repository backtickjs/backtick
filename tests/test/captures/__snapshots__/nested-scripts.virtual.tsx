import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.lift((() => {
    const __cs_x = 0;
    return cs.splice(cs.lift(__cs_x));
})()),
  );
});
