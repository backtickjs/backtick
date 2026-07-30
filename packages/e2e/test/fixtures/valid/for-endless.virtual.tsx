import { cs } from "@backtickjs/core";

// `for (;;)` has no condition, so `break` is the only way out.
export default cs.lift((() => {
    let __cs_i = cs.let(0);
    for (;;) {
        if (__cs_i === 4) {
            break;
        }
        __cs_i = cs.const(__cs_i + 1);
    }
    return cs.const(__cs_i);
})());
