import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bare `return` exits a script early, with `undefined`.
it("earlyReturn", async (t) => {
  await snapshotCase(
    t,
    "earlyReturn",
    cs.lift((() => {
      let __cs_n = 0;
      if (__cs_n === 0) {
        return;
      }
      __cs_n = 1;
      return __cs_n;
    })()),
  );
});
