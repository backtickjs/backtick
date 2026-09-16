import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
it("prefixNot", async (t) => {
  await snapshotCase(
    t,
    "prefixNot",
    cs`(ready: boolean, count: number) => {
      if (!ready) {
        return "waiting";
      }
      return !(count > 3) ? "room left" : "full";
    }`,
  );
});
