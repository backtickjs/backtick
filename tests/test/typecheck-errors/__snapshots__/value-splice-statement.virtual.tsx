import { cs } from "@backtickjs/core";

// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs.lift(cs.const(1));

export const script = cs.lift((() => {
    // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'void'.
    cs.statement((cs.splice((count)) satisfies typeof cs.ClientUnknown));
})());
