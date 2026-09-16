import { cs } from "@backtickjs/core";

// A bare `return` exits an action early; the completion is null either way.
const earlyReturn = cs.lift((() => {
    let __cs_n = 0;
    if (__cs_n === 0) {
        return;
    }
    __cs_n = cs.const(1);
})());
