import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host ascription putting `undefined` in a function's return, which is
// ordinary now that `undefined` is a value: the function stores, it calls, and
// what a call answers with is `string | undefined` on both sides of the
// boundary.
type Maybe = string | undefined;

const lying: Client<() => Maybe> = cs.lift(cs.const(() => "hi"));

it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.lift((() => {
    const __cs_stored = cs.const(cs.splice((lying)) satisfies typeof cs.ClientUnknown);
    const __cs_caught = cs.const((cs.splice((lying)) satisfies typeof cs.ClientUnknown)());
    return cs.const(1);
})()),
  );
});
