import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
it("loopJumps", async (t) => {
  await snapshotCase(
    t,
    "loopJumps",
    cs.lift((() => {
      let __cs_out = "";
      for (let __cs_i = 0; __cs_i < 5; __cs_i = __cs_i + 1) {
        if (__cs_i === 1) {
          continue;
        }
        while (true) {
          __cs_out = __cs_out + __cs_i;
          break;
        }
        if (__cs_i === 3) {
          break;
        }
      }
      return __cs_out;
    })()),
  );
});
