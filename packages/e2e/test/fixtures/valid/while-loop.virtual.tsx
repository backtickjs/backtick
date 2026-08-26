import { cs } from "@backtickjs/core";

export default cs.lift((() => {
    let __cs_i = 0;
    let __cs_total = 0;
    while (__cs_i < 5) {
        __cs_total = cs.const(__cs_total + __cs_i);
        if (__cs_i === 3) {
            return cs.const(__cs_total);
        }
        __cs_i = cs.const(__cs_i + 1);
    }
    return cs.const(__cs_total);
})());
