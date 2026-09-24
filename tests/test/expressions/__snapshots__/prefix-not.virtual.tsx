import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `!` negates its operand.
it("prefixNot", async (t) => {
  await snapshotCase(
    t,
    "prefixNot",
    cs.lift((__cs_ready: boolean, __cs_count: number) => {
    if (!__cs_ready) {
        return "waiting";
    }
    return !(__cs_count > 3) ? "room left" : "full";
}),
  );
});
