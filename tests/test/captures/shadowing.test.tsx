import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function addOwnTotal(lhs: Client<number>, rhs: number): Client<number> {
  return cs`{
    let total = 0;
    total = total + $lhs;
    total = total + $rhs;
    return total;
  }`;
}

it("shadowing", async (t) => {
  await snapshotCase(
    t,
    "shadowing",
    cs`{
      const total = 1;
      return ${addOwnTotal(cs`total`, 100)};
    }`,
  );
});
