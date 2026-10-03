import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(
    t,
    "partialReturnScript",
    cs.lift((() => {
      let __cs_n = 1;
      if (__cs_n === 2) {
        return "some";
      }
    })()),
  );
});

it("partialReturnArrow", async (t) => {
  await snapshotCase(
    t,
    "partialReturnArrow",
    cs.lift((() => {
      const __cs_pick = (__cs_b: boolean) => {
        if (__cs_b) {
          return "taken";
        }
      };
      return [__cs_pick(true), __cs_pick(false)];
    })()),
  );
});
