import { cs } from "@backtickjs/core";

// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.liftValue(() => {
    const __cs_x = cs.value(1);
});

export const called = cs.liftValue(cs.splice((ping))());

const action = cs.liftAction((() => {
    const __cs_x = cs.value(1);
})());

export const spliced = cs.liftValue(cs.splice((action)));
