import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";
const shared = _jsx("span", { children: "hi" });
// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
it("jsxSharedSubtree", async (t) => {
  await snapshotCase(
    t,
    "jsxSharedSubtree",
    _jsx("div", { children: [shared, shared] }),
  );
});
