import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("whileLoop", async (t) => {
  await snapshotCase(
    t,
    "whileLoop",
    cs.lift((() => {
      let __cs_i = 0;
      let __cs_total = 0;
      while (__cs_i < 5) {
        __cs_total = __cs_total + __cs_i;
        if (__cs_i === 3) {
          return __cs_total;
        }
        __cs_i = __cs_i + 1;
      }
      return __cs_total;
    })()),
  );
});
