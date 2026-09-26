import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Signal } from "solid-js";
import { snapshotCase } from "../snapshotCase.ts";

const make = (f: Client<(n: number) => Signal<number>>) =>
  cs.lift((() => {
    return cs.splice((f) satisfies typeof cs.Spliceable)(1)[0]();
})());

const wrapped = cs.lift((__cs_n: number) => cs.splice((createSignal) satisfies typeof cs.Spliceable)(__cs_n + 10));

it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.lift((() => {
    return cs.splice(make(createSignal) satisfies typeof cs.Spliceable) + cs.splice(make(wrapped) satisfies typeof cs.Spliceable);
})()),
  );
});
