import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs`$lhs + $rhs`;
}

it("deepNestedScripts", async (t) => {
  await snapshotCase(t, "deepNestedScripts", cs`${add(cs`1`, cs`2`)}`);
});
