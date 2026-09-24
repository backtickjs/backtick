import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The one global. What it is, is the host's to answer; which members exist
// and what each means is the format's, which is why the list is short — only
// the members every host can agree on to the last bit are here.
it("math", async (t) => {
  await snapshotCase(
    t,
    "math",
    cs.lift((() => {
    const __cs_rounded = Math.round(2.5) + "," + Math.round(-2.5) + "," + Math.round(-0.5);
    const __cs_edges = Math.floor(-1.5) + "," + Math.ceil(-1.5) + "," + Math.trunc(-1.5);
    const __cs_picks = Math.min(3, 1, 2) + "," + Math.max(3, 1, 2) + "," + Math.abs(-4);
    return __cs_rounded + "|" + __cs_edges + "|" + __cs_picks + "|" + Math.sqrt(9) + "," + Math.sign(-8) + "," + Math.fround(1.5) + "|" + (Math.PI > 3.14) + "," + (Math.E > 2.71);
})()),
  );
});
