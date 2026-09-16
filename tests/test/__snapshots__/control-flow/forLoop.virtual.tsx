import { cs } from "@backtickjs/core";

// `i++` is not an operator in a client script, so the update is an assignment.
const forLoop = cs.lift((() => {
    let __cs_total = 0;
    for (let __cs_i = 0; __cs_i < 5; __cs_i = cs.const(__cs_i + 1)) {
        __cs_total = cs.const(__cs_total + __cs_i);
    }
    return cs.const(__cs_total);
})());
