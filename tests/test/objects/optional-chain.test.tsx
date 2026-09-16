import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs`(p: { x: number } | null) => {
  return p?.x;
}`;

const deep = cs`(o: { inner: { z: number } | null } | null) => {
  return o?.inner?.z;
}`;

const shout = cs`(s: string | null) => {
  return s?.concat("!");
}`;

it("optionalChain", async (t) => {
  await snapshotCase(
    t,
    "optionalChain",
    cs`({
      found: $pick({ x: 5 }),
      missing: $pick(null),
      deep: $deep({ inner: { z: 7 } }),
      cut: $deep({ inner: null }),
      top: $deep(null),
      loud: $shout("hi"),
      silent: $shout(null),
    })`,
  );
});
