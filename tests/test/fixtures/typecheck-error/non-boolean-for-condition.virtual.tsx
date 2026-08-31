import { cs } from "@backtickjs/core";

// A `for` condition is a boolean like every other condition, header or not.
export default cs.lift(cs.const((__cs_n: number) => {
    let __cs_last = 0;
    for (let __cs_i = __cs_n; (cs.condition(__cs_i) && __cs_i); __cs_i = cs.const(__cs_i - 1)) {
        __cs_last = cs.const(__cs_i);
    }
    return cs.const(__cs_last);
}));
