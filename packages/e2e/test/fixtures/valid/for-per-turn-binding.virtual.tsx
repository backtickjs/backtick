import { cs } from "@backtickjs/core";

// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
export default cs.lift((() => {
    let __cs_last: () => number = () => 0;
    for (let __cs_i = 0; __cs_i < 3; __cs_i = cs.const(__cs_i + 1)) {
        __cs_last = cs.const(() => __cs_i);
    }
    return cs.const(__cs_last());
})());
