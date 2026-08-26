import { cs } from "@backtickjs/core";

// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
export default cs.lift((() => {
    let __cs_out = "";
    for (let __cs_i = 0; __cs_i < 5; __cs_i = cs.const(__cs_i + 1)) {
        if (__cs_i === 1) {
            continue;
        }
        while (true) {
            __cs_out = cs.const(__cs_out + __cs_i);
            break;
        }
        if (__cs_i === 3) {
            break;
        }
    }
    return cs.const(__cs_out);
})());
