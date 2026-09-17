import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.const((cs.splice((lhs)) satisfies typeof cs.ClientUnknown) + (cs.splice((rhs)) satisfies typeof cs.ClientUnknown)));
}

it("deepNestedScripts", async (t) => {
  await snapshotCase(t, "deepNestedScripts", cs.lift(cs.const((cs.splice(add(cs.lift(cs.const(1)), cs.lift(cs.const(2)))) satisfies typeof cs.ClientUnknown))));
});
