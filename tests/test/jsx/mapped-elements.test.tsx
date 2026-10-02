import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

const elementLabels = ["alpha", "beta", "gamma"];

// A list mapped on the host. The array is host data, so the map runs while
// bundling and each item becomes a script of its own — the list's length is
// fixed in the bundle. `largeData` is the other shape, where a script maps on
// the client and the bundle carries one template plus the data.
it("mappedElements", async (t) => {
  await snapshotCase(
    t,
    "mappedElements",
    cs`<div>{${elementLabels.map((item) => cs`<span>{$item}</span>`)}}</div>`,
  );
});
