import { cs } from "@backtickjs/core";

// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs.liftValue(1);

export const script = cs.liftAction((() => {
    cs.statement(cs.splice((count)));
})());
