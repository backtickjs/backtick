import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

function outerBase(inner: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_base = 1;
    return __cs_base + (cs.splice(middleBase(inner)) satisfies typeof cs.ClientUnknown);
})());
}

function middleBase(inner: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_base = 2;
    return __cs_base * (cs.splice((inner)) satisfies typeof cs.ClientUnknown);
})());
}

// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs.lift((() => {
    const __cs_base = 10;
    return (cs.splice(outerBase(cs.lift(__cs_base))) satisfies typeof cs.ClientUnknown);
})()),
  );
});
