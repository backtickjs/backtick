import { cs } from "@backtickjs/core";

// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs.lift(cs.const(1));

export const script = cs.lift((() => {
    cs.statement(cs.splice((count)) satisfies import("@backtickjs/core").ClientUnknown);
})());
