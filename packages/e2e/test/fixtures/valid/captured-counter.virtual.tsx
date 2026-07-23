import { cs } from "@backtickjs/core";

// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
export default cs.lift((() => {
    let __cs_count = cs.let(0);
    const __cs_bump = cs.const(() => {
        __cs_count = cs.const(__cs_count + 1);
        return cs.const(__cs_count);
    });
    return cs.const(__cs_bump() + __cs_bump());
})());
