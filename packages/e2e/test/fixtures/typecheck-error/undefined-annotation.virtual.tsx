import { cs } from "@backtickjs/core";

// A host alias smuggles `undefined` past the syntactic keyword ban; the
// value-position checks reject the parameter at its first use — `cs.const`
// constrains initializers and assignment right-hand sides to `ClientValue`.
type Maybe = string | undefined;

const stored = cs.lift(cs.const((__cs_x: Maybe) => {
    const __cs_y = cs.const(__cs_x);
    return 1;
}));

const written = cs.lift(cs.const((__cs_x: Maybe) => {
    let __cs_y = cs.let("");
    __cs_y = cs.const(__cs_x);
    return 1;
}));
