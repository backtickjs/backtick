import { cs } from "@backtickjs/core";

// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.lift(cs.const(() => {
    const __cs_x = cs.const(1);
}));

export const called = cs.lift(cs.const(cs.splice((ping))()));

const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export const spliced = cs.lift(cs.const(cs.splice((action))));
