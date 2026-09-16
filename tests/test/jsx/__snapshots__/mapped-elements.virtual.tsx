import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";

const elementLabels = ["alpha", "beta", "gamma"];

// A list mapped on the host. The array is host data, so the map runs while
// bundling and each item becomes its own element — the list's length is fixed
// in the bundle. `largeData` is the other shape, where a `cs` script maps
// on the client and the bundle carries one template plus the data.
//
// Each element is referenced once, so none hoists: they inline into the
// `View`'s entry, each carrying its own key inside the element node.
it("mappedElements", async (t) => {
  await snapshotCase(
    t,
    "mappedElements",
    <div>
      {elementLabels.map((item) => (
        <span>{item}</span>
      ))}
    </div>,
  );
});
