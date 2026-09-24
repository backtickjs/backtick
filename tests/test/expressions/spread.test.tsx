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
    cs`{
      const front = [1, 2];
      const back = [3];
      const none: number[] = [];
      const all = [0, ...front, ...none, ...back, 4];
      const twice = [...all, ...all];
      return all.join(",") + "|" + twice.length;
    }`,
  );
});
