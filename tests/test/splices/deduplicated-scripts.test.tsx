import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs`7`;

it("deduplicatedScripts", async (t) => {
  await snapshotCase(t, "deduplicatedScripts", cs`({ a: $leaf, b: $leaf })`);
});
