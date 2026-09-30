import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.lift((__cs_p: {
    x: number;
} | null) => {
    return __cs_p?.x;
});

const deep = cs.lift((__cs_o: {
    inner: {
        z: number;
    } | null;
} | null) => {
    return __cs_o?.inner?.z;
});

const shout = cs.lift((__cs_s: string | null) => {
    return __cs_s?.concat("!");
});

it("optionalChain", async (t) => {
  await snapshotCase(
    t,
    "optionalChain",
    cs.lift({ found: cs.splice((pick))({ x: 5 }), missing: cs.splice((pick))(null), deep: cs.splice((deep))({ inner: { z: 7 } }), cut: cs.splice((deep))({ inner: null }), top: cs.splice((deep))(null), loud: cs.splice((shout))("hi"), silent: cs.splice((shout))(null) }),
  );
});
