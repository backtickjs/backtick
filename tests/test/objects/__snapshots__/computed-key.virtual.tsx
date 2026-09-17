import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A key computed while the script runs. A literal that holds one is a node,
// as one a spread runs through is: its key has no text to ship as data. Keys
// are evaluated in order, and a later one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.lift((() => {
    const __cs_base = cs.const({ a: 1, b: 2 });
    const __cs_name = cs.const("b");
    return cs.const({ ...__cs_base, [cs.string(__cs_name)]: 9, [cs.string("c" + "d")]: 3, a: 4 });
})()),
  );
});
