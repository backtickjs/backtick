import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.splice((lhs)) + cs.splice((rhs)));
}

it("deepNestedScripts", async (t) => {
  await snapshotCase(t, "deepNestedScripts", cs.lift(cs.splice(add(cs.lift(1), cs.lift(2)))));
});
