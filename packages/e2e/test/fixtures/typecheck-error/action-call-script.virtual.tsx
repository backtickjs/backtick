import { cs } from "@backtickjs/core";

// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.value(() => {
    const __cs_x = 1;
});

export const called = cs.value(cs.splice((ping))());

const action = cs.action((() => {
    const __cs_x = 1;
})());

export const spliced = cs.value(cs.splice((action)));
