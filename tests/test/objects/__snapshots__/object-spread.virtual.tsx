import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A spread in an object literal, which the format cannot ship as the data it
// spells: an object in a value slot *is* its own keys and none of them is
// reserved, so there is nowhere to write "and every key of that one". A
// literal a spread runs through is `Object.fromEntries` over its pairs
// instead, the spread being `Object.entries` of what it spreads; a literal
// without one is data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
it("objectSpread", async (t) => {
  await snapshotCase(
    t,
    "objectSpread",
    cs.lift((() => {
    const __cs_base = { a: 1, b: 2 };
    const __cs_over = { b: 9 };
    return { ...__cs_base, ...__cs_over, c: 3 };
})()),
  );
});
