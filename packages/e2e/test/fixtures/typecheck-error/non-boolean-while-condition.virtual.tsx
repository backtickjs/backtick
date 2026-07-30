import { cs } from "@backtickjs/core";

// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs.lift(cs.const((__cs_n: number) => {
    let __cs_left = cs.let(__cs_n);
    while ((cs.condition(__cs_left) && __cs_left)) {
        __cs_left = cs.const(__cs_left - 1);
    }
    return cs.const(__cs_left);
}));
