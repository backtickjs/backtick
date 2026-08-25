import { cs, state } from "@backtickjs/core";

// An action completes without returning, so `void` is what it splices as, and a
// cell holds a client value. Caught here rather than at the bundle, where
// `lowerSpliceable`'s backstop would catch it as an untyped caller.
const act = cs.lift((() => {
    const __cs_n = cs.const(cs.splice((state))(2));
    cs.statement(cs.receiver(__cs_n).write(3));
})());

const script = cs.lift((() => {
    const __cs_held = cs.const(cs.splice((state))(cs.splice((act))));
    return cs.const(1);
})());
