import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(
    t,
    "forLoop",
    cs.lift((() => {
      let __cs_total = 0;
      for (let __cs_i = 0; __cs_i < 5; __cs_i = __cs_i + 1) {
        __cs_total = __cs_total + __cs_i;
      }
      return __cs_total;
    })()),
  );
});
