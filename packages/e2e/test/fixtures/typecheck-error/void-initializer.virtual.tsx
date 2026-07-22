import { cs } from "@backtickjs/core";

// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.liftValue(() => {
    let __cs_n = 0;
    __cs_n = 1;
});

const script = cs.liftValue((() => {
    const __cs_x = (cs.value(cs.spliceValue((ping))()), cs.spliceValue((ping))());
    return 1;
})());

const action = cs.liftAction((() => {
    const __cs_x = (cs.value(cs.spliceValue((ping))()), cs.spliceValue((ping))());
})());

// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.liftValue((__cs_text: string) => {
    return __cs_text;
});

const wrongArgument = cs.liftValue((() => {
    const __cs_x = (cs.value(cs.spliceValue((label))(true)), cs.spliceValue((label))(true));
    return 1;
})());
