import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

const shared = cs.lift((() => <span>hi</span>)());

// The same script spliced twice is declared once in the bundle, and called
// where each splice stands.
it("jsxSharedSubtree", async (t) => {
  await snapshotCase(
    t,
    "jsxSharedSubtree",
    cs.lift((() => <div>{cs.splice([shared, shared])}</div>)()),
  );
});
