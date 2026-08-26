import { cs } from "@backtickjs/core";

// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.lift(cs.const(() => {
    let __cs_n = cs.let(0);
    __cs_n = cs.const(1);
}));

const script = cs.lift((() => {
    const __cs_x = cs.const((cs.splice((ping)) satisfies import("@backtickjs/core").ClientUnknown)());
    return cs.const(1);
})());

const action = cs.lift((() => {
    const __cs_x = cs.const((cs.splice((ping)) satisfies import("@backtickjs/core").ClientUnknown)());
})());

// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.lift(cs.const((__cs_text: string) => {
    return cs.const(__cs_text);
}));

const wrongArgument = cs.lift((() => {
    const __cs_x = cs.const((cs.splice((label)) satisfies import("@backtickjs/core").ClientUnknown)(true));
    return cs.const(1);
})());
