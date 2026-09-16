import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
it("forHeaderParts", async (t) => {
  await snapshotCase(
    t,
    "forHeaderParts",
    cs.lift((() => {
    let __cs_i = 0;
    let __cs_seen = "";
    for (; __cs_i < 3;) {
        __cs_seen = cs.const(__cs_seen + __cs_i);
        __cs_i = cs.const(__cs_i + 1);
    }
    return cs.const(__cs_seen);
})()),
  );
});
