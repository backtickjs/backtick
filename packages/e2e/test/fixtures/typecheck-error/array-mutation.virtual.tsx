import { cs } from "@backtickjs/core";

// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs.liftValue((() => {
    const __cs_coins = cs.value([1, 2, 3]);
    const __cs_last = cs.value(cs.receiver(__cs_coins).pop());
    return 1;
})());

const action = cs.liftAction((() => {
    const __cs_coins = cs.value([1, 2]);
    cs.statement(cs.receiver(__cs_coins).push(3));
})());
