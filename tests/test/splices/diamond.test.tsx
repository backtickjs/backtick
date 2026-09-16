import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler
// shares each script rather than re-expanding it per path, so the payload has
// one entry per level (linear) — not one per path, which would blow up as
// 2^depth.
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
