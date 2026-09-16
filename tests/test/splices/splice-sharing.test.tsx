import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs`$lhs + $rhs`;
}

it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs`({
      x: ${add(cs`1`, cs`2`)},
      y: ${add(cs`3`, cs`4`)},
    })`,
  );
});
