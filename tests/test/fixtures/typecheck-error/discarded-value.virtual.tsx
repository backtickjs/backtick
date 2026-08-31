import { cs } from "@backtickjs/core";

// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.lift(cs.const(() => {
    return cs.const(1);
}));

const ping = cs.lift(cs.const(() => {
    let __cs_n = 0;
    __cs_n = cs.const(1);
}));

const action = cs.lift((() => {
    cs.statement((cs.splice((ping)) satisfies import("@backtickjs/core").ClientUnknown)());
    cs.statement((cs.splice((getValue)) satisfies import("@backtickjs/core").ClientUnknown)());
})());
