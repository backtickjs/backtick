import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs.lift((() => {
    const __cs_twice = (__cs_Row: (p: {
        n: number;
    }) => JSX.Element) => <ul>{cs.splice(cs.lift((() => <__cs_Row n={1}/>)()))}{cs.splice(cs.lift((() => <__cs_Row n={2}/>)()))}</ul>;
    return __cs_twice((__cs_p: {
        n: number;
    }) => <li>{"row " + __cs_p.n}</li>);
})()),
  );
});
