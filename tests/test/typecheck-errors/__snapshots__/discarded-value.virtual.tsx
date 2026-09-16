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
    cs.statement((cs.splice((ping)) satisfies typeof cs.ClientUnknown)());
    // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'void'.
    cs.statement((cs.splice((getValue)) satisfies typeof cs.ClientUnknown)());
})());

// The same rule in a script that returns: the position is what decides, so a
// discarded value fails here too while the action beside it stands.
const valued = cs.lift((() => {
    cs.statement((cs.splice((ping)) satisfies typeof cs.ClientUnknown)());
    // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'void'.
    cs.statement((cs.splice((getValue)) satisfies typeof cs.ClientUnknown)());
    return cs.const(1);
})());
