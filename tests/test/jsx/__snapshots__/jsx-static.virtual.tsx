import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";

// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
it("jsxStatic", async (t) => {
  await snapshotCase(
    t,
    "jsxStatic",
    <div>
      <span>hi</span>
    </div>,
  );
});
