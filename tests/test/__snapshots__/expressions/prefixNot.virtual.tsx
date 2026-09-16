import { cs } from "@backtickjs/core";

// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
const prefixNot = cs.lift(cs.const((__cs_ready: boolean, __cs_count: number) => {
    if (!(cs.condition(__cs_ready) && __cs_ready)) {
        return cs.const("waiting");
    }
    return cs.const(!(__cs_count > 3) ? "room left" : "full");
}));
