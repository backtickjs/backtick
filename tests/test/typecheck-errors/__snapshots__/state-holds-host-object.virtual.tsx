import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";

// A host object with behaviour reaching a cell, refused where it is written.
//
// A cell is the one place a splice lands with nothing waiting for it: every
// other position has a bound — the binding, the receiver a member is read off,
// the operator it stands beside — and `$createSignal` takes its initial
// unbound, so that the width the host gave the value survives. The binding it
// lands in would take it, and the bundle would be the first to say no.
//
// What says no here is the splice itself: what it answers with is checked
// against `Spliceable`, which a `Date` is not.
const host = new Date();

export default cs.lift((() => {
    // @ts-expect-error: Type 'Date' does not satisfy the expected type 'Spliceable'.
    const __cs_held = cs.splice((createSignal) satisfies typeof cs.Spliceable)(cs.splice((host) satisfies typeof cs.Spliceable));
    // @ts-expect-error: Type 'Date' does not satisfy the expected type 'Spliceable'.
    __cs_held[1](cs.splice((host) satisfies typeof cs.Spliceable));
})());
