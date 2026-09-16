import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";

const shared = <span>hi</span>;

// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
it("jsxSharedSubtree", async (t) => {
  await snapshotCase(t, "jsxSharedSubtree", <div>{[shared, shared]}</div>);
});
