import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs: Client<number>): Client<number> {
  return cs.lift((cs.splice((lhs)) satisfies typeof cs.ClientUnknown) + 2);
}

it("dollarName", async (t) => {
  await snapshotCase(
    t,
    "dollarName",
    cs.lift((() => {
    const __cs_foo$ = 1;
    return (cs.splice(add(cs.lift(__cs_foo$))) satisfies typeof cs.ClientUnknown);
})()),
  );
});
