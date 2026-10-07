import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. Each splice is
// rendered where it stands, so the bundle's calls follow every path: 2^depth
// calls to the bottom level. Each script's module is still declared once.
const d0 = cs`1`;

const d1 = cs`{
  return $d0 + $d0;
}`;

const d2 = cs`{
  return $d1 + $d1;
}`;

const d3 = cs`{
  return $d2 + $d2;
}`;

const d4 = cs`{
  return $d3 + $d3;
}`;

it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
