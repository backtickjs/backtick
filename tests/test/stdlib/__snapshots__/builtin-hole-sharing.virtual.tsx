import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { Signal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

const make = (f: Client<(n: number) => Signal<number>>) =>
  cs.lift((() => {
    return (cs.splice((f)))(1)[0]();
  })());

const wrapped = cs.lift((() => (__cs_n: number) => (cs.splice((createSignal)))(__cs_n + 10))());

it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.lift((() => {
      return (cs.splice(make(createSignal))) + (cs.splice(make(wrapped)));
    })()),
  );
});
