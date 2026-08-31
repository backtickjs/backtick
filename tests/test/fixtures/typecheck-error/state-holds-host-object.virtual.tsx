import { cs, state } from "@backtickjs/core";

// A host object with behaviour reaching a cell, refused where it is written.
//
// A cell is the one place a splice lands with nothing waiting for it: every
// other position has a bound — the binding, the receiver a member is read off,
// the operator it stands beside — and `$state` takes its initial unbound, so
// that the width the host gave the value survives. `State<Date>` is a
// `ClientHandle` and a `ClientHandle` is a client value, so the binding it
// lands in would take it and the bundle would be the first to say no.
//
// What says no here is the splice itself: what it answers with is checked
// against `ClientUnknown`, which a `Date` is not.
const host = new Date();

export default cs.lift((() => {
    const __cs_held = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(cs.splice((host)) satisfies import("@backtickjs/core").ClientUnknown));
    cs.statement(cs.receiver(__cs_held).write(cs.splice((host)) satisfies import("@backtickjs/core").ClientUnknown));
})());
