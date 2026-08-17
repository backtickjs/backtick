import { cs } from "@backtickjs/core";

// A host alias smuggles `undefined` past the syntactic keyword ban; the
// value-position checks reject the parameter at its first use — `cs.const`
// constrains initializers and assignment right-hand sides to `ClientValue`.
//
// First use and not the signature: `ClientFunction` stands over `never`
// parameters so that every client function is one, which is what lets the
// schema declare it. So a parameter annotation is not checked where it is
// written, and one that is never used goes unnoticed — the diagnostics below
// are the uses, and there is deliberately none for the arrow itself.
type Maybe = string | undefined;

const stored = cs.lift(cs.const((__cs_x: Maybe) => {
    const __cs_y = cs.const(__cs_x);
    return cs.const(1);
}));

const written = cs.lift(cs.const((__cs_x: Maybe) => {
    let __cs_y = cs.let("");
    __cs_y = cs.const(__cs_x);
    return cs.const(1);
}));
