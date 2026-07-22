import { cs } from "@backtickjs/core";

// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
export default cs.liftValue((() => {
    const __cs_coins = cs.value([1, 2, 3]);
    const __cs_four = cs.value(4);
    return { count: cs.receiver(__cs_coins).length, all: cs.receiver(__cs_coins).concat([__cs_four]), part: cs.receiver(__cs_coins).slice(0, 2), where: cs.receiver(__cs_coins).indexOf(2), has: cs.receiver(__cs_coins).includes(3), text: cs.receiver(__cs_coins).join("-"), doubled: cs.receiver(__cs_coins).map(__cs_n => __cs_n * 2), small: cs.receiver(__cs_coins).filter(__cs_n => __cs_n < 3) };
})());
