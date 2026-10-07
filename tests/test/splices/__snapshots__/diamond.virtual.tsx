import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. Each splice is
// rendered where it stands, so the bundle's calls follow every path: 2^depth
// calls to the bottom level. Each script's module is still declared once.
const d0 = cs.lift((() => 1)());

const d1 = cs.lift((() => {
  return (cs.splice((d0))) + (cs.splice((d0)));
})());

const d2 = cs.lift((() => {
  return (cs.splice((d1))) + (cs.splice((d1)));
})());

const d3 = cs.lift((() => {
  return (cs.splice((d2))) + (cs.splice((d2)));
})());

const d4 = cs.lift((() => {
  return (cs.splice((d3))) + (cs.splice((d3)));
})());

it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
