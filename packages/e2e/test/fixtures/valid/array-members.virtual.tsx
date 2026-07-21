import { cs } from "@backtickjs/core";

// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
export default cs.liftValue((() => {
    const __cs_coins = [1, 2, 3];
    const __cs_four = 4;
    return { count: cs.virtualize(__cs_coins).length, all: cs.virtualize(__cs_coins).concat([__cs_four]), part: cs.virtualize(__cs_coins).slice(0, 2), where: cs.virtualize(__cs_coins).indexOf(2), has: cs.virtualize(__cs_coins).includes(3), text: cs.virtualize(__cs_coins).join("-"), doubled: cs.virtualize(__cs_coins).map(__cs_n => __cs_n * 2), small: cs.virtualize(__cs_coins).filter(__cs_n => __cs_n < 3) };
})());
