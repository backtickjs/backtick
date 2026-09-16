import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const valueScriptEffects: Client<void> = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

const ping: Client<() => void> = cs.lift(cs.const(() => {
    let __cs_n = 0;
    __cs_n = cs.const(1);
}));

it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.lift(cs.const((__cs_b: boolean) => {
    let __cs_n = 0;
    cs.statement(cs.splice((valueScriptEffects)) satisfies typeof cs.ClientUnknown);
    if ((cs.condition(__cs_b) && __cs_b)) {
        cs.statement((cs.splice((ping)) satisfies typeof cs.ClientUnknown)());
        __cs_n = cs.const(1);
    }
    return cs.const(__cs_n);
})),
  );
});
