import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

const make = (f: Client<(n: number) => State<number>>) =>
  cs.lift((() => {
    return cs.const((cs.splice((f)) satisfies typeof cs.ClientUnknown)(1).get());
})());

const wrapped = cs.lift(cs.const((__cs_n: number) => (cs.splice((state)) satisfies typeof cs.ClientUnknown)(__cs_n + 10)));

it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.lift((() => {
    return cs.const((cs.splice(make(state)) satisfies typeof cs.ClientUnknown) + (cs.splice(make(wrapped)) satisfies typeof cs.ClientUnknown));
})()),
  );
});
