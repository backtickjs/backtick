import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.splice((lhs) satisfies typeof cs.Spliceable) + cs.splice((rhs) satisfies typeof cs.Spliceable));
}

it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.lift({ x: cs.splice(add(cs.lift(1), cs.lift(2)) satisfies typeof cs.Spliceable), y: cs.splice(add(cs.lift(3), cs.lift(4)) satisfies typeof cs.Spliceable) }),
  );
});
