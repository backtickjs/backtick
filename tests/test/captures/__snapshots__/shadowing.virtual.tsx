import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function addOwnTotal(lhs: Client<number>, rhs: number): Client<number> {
  return cs.lift((() => {
    let __cs_total = 0;
    __cs_total = __cs_total + cs.splice((lhs));
    __cs_total = __cs_total + cs.splice((rhs));
    return __cs_total;
  })());
}

it("shadowing", async (t) => {
  await snapshotCase(
    t,
    "shadowing",
    cs.lift((() => {
      const __cs_total = 1;
      return cs.splice(addOwnTotal(cs.lift((() => __cs_total)()), 100));
    })()),
  );
});
