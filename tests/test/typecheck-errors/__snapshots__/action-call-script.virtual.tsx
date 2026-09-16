import { cs } from "@backtickjs/core";

// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.lift(cs.const(() => {
    const __cs_x = cs.const(1);
}));

export const called = cs.lift(cs.const((cs.splice((ping)) satisfies typeof cs.ClientUnknown)()));

const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

// @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
export const spliced = cs.lift(cs.const(cs.splice((action)) satisfies typeof cs.ClientUnknown));
