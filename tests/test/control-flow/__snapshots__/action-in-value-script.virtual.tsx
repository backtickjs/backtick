import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A script that returns a value may still run an action.
const valueScriptEffects: Client<void> = cs.lift((() => {
    const __cs_x = 1;
})());

const ping: Client<() => void> = cs.lift((() => () => {
    let __cs_n = 0;
    __cs_n = 1;
})());

it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.lift((() => (__cs_b: boolean) => {
    let __cs_n = 0;
    cs.splice((valueScriptEffects));
    if (__cs_b) {
        cs.splice((ping))();
        __cs_n = 1;
    }
    return __cs_n;
})()),
  );
});
