import { cs } from "@backtickjs/core";

// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.lift(cs.value(() => {
    let __cs_n = cs.widen(0);
    __cs_n = cs.value(1);
}));

const script = cs.lift(cs.value((() => {
    const __cs_x = cs.value(cs.splice((ping))());
    return 1;
})()));

const action = cs.lift((() => {
    const __cs_x = cs.value(cs.splice((ping))());
})());

// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.lift(cs.value((__cs_text: string) => {
    return __cs_text;
}));

const wrongArgument = cs.lift(cs.value((() => {
    const __cs_x = cs.value(cs.splice((label))(true));
    return 1;
})()));
