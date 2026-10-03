import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
it("spread", async (t) => {
  await snapshotCase(
    t,
    "spread",
    cs.lift((() => {
      const __cs_front = [1, 2];
      const __cs_back = [3];
      const __cs_none: number[] = [];
      const __cs_all = [0, ...__cs_front, ...__cs_none, ...__cs_back, 4];
      const __cs_twice = [...__cs_all, ...__cs_all];
      return __cs_all.join(",") + "|" + __cs_twice.length;
    })()),
  );
});
