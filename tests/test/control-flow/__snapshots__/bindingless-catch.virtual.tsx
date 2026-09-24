import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
it("bindinglessCatch", async (t) => {
  await snapshotCase(
    t,
    "bindinglessCatch",
    cs.lift((() => {
    try {
        throw "boom";
    }
    catch {
        return "caught";
    }
})()),
  );
});
