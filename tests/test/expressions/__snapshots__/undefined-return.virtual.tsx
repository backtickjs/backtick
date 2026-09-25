import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host ascription putting `undefined` in a function's return, which is
// ordinary now that `undefined` is a value: the function stores, it calls, and
// what a call answers with is `string | undefined` on both sides of the
// boundary.
type Maybe = string | undefined;

const lying: Client<() => Maybe> = cs.lift(() => "hi");

it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.lift((() => {
    const __cs_stored = cs.splice((lying) satisfies typeof cs.Spliceable);
    const __cs_caught = cs.splice((lying) satisfies typeof cs.Spliceable)();
    return 1;
})()),
  );
});
