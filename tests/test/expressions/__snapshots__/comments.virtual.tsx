import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
it("comments", async (t) => {
  await snapshotCase(
    t,
    "comments",
    cs.lift((() => {
    const __cs_count = cs.const(1);
    if (__cs_count === 1) {
        return cs.const("one");
    }
    return cs.const("many");
})()),
  );
});
