import { cs } from "@backtickjs/core";

// Nested headers reusing a name, and a body that shadows the header's own: the
// update still means the header's binding, because names resolve to their
// binding before anything is lowered.
export default cs.lift((() => {
    let __cs_out = cs.let("");
    for (let __cs_i = cs.let(0); __cs_i < 2; __cs_i = cs.const(__cs_i + 1)) {
        const __cs_i = cs.const("-");
        for (let __cs_j = cs.let(0); __cs_j < 2; __cs_j = cs.const(__cs_j + 1)) {
            __cs_out = cs.const(__cs_out + __cs_i + __cs_j);
        }
    }
    return cs.const(__cs_out);
})());
