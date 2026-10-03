import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A tree with only static props: one script, nothing spliced into it, and the
// nested element written in place.
it("jsxStatic", async (t) => {
  await snapshotCase(
    t,
    "jsxStatic",
    cs.lift((() => <div>
      <span>hi</span>
    </div>)()),
  );
});
