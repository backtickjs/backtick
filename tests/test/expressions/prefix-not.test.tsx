import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `!` negates its operand.
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
