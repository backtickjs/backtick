import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";

// A server component can render nothing. The invocation is still an instance —
// it owns the cells the component declared, and a re-render can give it a child
// later — so it keeps a tree entry of its own, with null content.
async function Absent() {
  return null;
}

it("rendersNothing", async (t) => {
  await snapshotCase(
    t,
    "rendersNothing",
    <div>
      <Absent />
    </div>,
  );
});
