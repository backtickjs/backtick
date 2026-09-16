import { cs } from "@backtickjs/core";

// `for (;;)` has no condition, so `break` is the only way out.
const forEndless = cs.lift((() => {
    let __cs_i = 0;
    for (;;) {
        if (__cs_i === 4) {
            break;
        }
        __cs_i = cs.const(__cs_i + 1);
    }
    return cs.const(__cs_i);
})());
