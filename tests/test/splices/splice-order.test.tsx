import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;

it("spliceOrder", async (t) => {
  await snapshotCase(t, "spliceOrder", cs`({ a: $count, b: ${++count} })`);
});
