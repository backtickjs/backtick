import { cs } from "@backtickjs/core";

// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.liftValue(() => {
    return 1;
});

const ping = cs.liftValue(() => {
    let __cs_n = 0;
    __cs_n = 1;
});

const action = cs.liftAction((() => {
    cs.statement(cs.spliceValue((ping))());
    cs.statement(cs.spliceValue((getValue))());
})());
