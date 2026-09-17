import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.const((cs.splice((lhs)) satisfies typeof cs.ClientUnknown) + (cs.splice((rhs)) satisfies typeof cs.ClientUnknown)));
}

it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.lift(cs.const({ x: (cs.splice(add(cs.lift(cs.const(1)), cs.lift(cs.const(2)))) satisfies typeof cs.ClientUnknown), y: (cs.splice(add(cs.lift(cs.const(3)), cs.lift(cs.const(4)))) satisfies typeof cs.ClientUnknown) })),
  );
});
