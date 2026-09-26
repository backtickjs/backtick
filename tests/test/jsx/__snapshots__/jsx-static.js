import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";
// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
it("jsxStatic", async (t) => {
  await snapshotCase(
    t,
    "jsxStatic",
    _jsx("div", { children: _jsx("span", { children: "hi" }) }),
  );
});
