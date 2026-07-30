import { cs } from "@backtickjs/core";

// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
export default cs.lift((() => {
    const __cs_coins = cs.const([5, 31, 7]);
    let __cs_total = cs.let(0);
    for (let __cs_i = cs.let(0); __cs_i < cs.receiver(__cs_coins).length; __cs_i = cs.const(__cs_i + 1)) {
        __cs_total = cs.const(__cs_total + cs.index(__cs_coins, __cs_i));
    }
    return cs.const(__cs_total);
})());
