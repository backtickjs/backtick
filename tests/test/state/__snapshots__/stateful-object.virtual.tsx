import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// An object with storage of its own, made by a client function: a signal holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.lift((__cs_initial: number) => {
    const __cs_count = cs.splice((createSignal) satisfies typeof cs.Spliceable)(__cs_initial);
    return { get: () => __cs_count[0](), add: (__cs_n: number) => {
            __cs_count[1](__cs_count[0]() + __cs_n);
        } };
});

it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs.lift((() => {
    const __cs_c = cs.splice((counter) satisfies typeof cs.Spliceable)(10);
    return <button onclick={cs.lift(() => {
        __cs_c.add(5);
    })}>{cs.lift(__cs_c.get())}</button>;
})()),
  );
});
