import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A key computed while the script runs. A literal that holds one is
// `Object.fromEntries` over its pairs, as one a spread runs through is: its
// key has no text to ship as data. Keys are evaluated in order, and a later
// one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.lift((() => {
      const __cs_base = { a: 1, b: 2 };
      const __cs_name = "b";
      return {
        ...__cs_base,
        [__cs_name]: 9,
        ["c" + "d"]: 3,
        a: 4,
      };
    })()),
  );
});
