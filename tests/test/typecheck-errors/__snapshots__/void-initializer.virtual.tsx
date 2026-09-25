import { cs } from "@backtickjs/core";

// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.lift(() => {
    let __cs_n = 0;
    __cs_n = 1;
});

const script = cs.lift((() => {
    const __cs_x = cs.splice((ping) satisfies typeof cs.Spliceable)();
    return 1;
})());

const action = cs.lift((() => {
    const __cs_x = cs.splice((ping) satisfies typeof cs.Spliceable)();
})());

// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.lift((__cs_text: string) => {
    return __cs_text;
});

const wrongArgument = cs.lift((() => {
    // @ts-expect-error: Argument of type 'boolean' is not assignable to parameter of type 'string'.
    const __cs_x = cs.splice((label) satisfies typeof cs.Spliceable)(true);
    return 1;
})());
