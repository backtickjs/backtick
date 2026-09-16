import { cs } from "@backtickjs/core";

// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs.lift((() => {
    const __cs_coins = cs.const([1, 2, 3]);
    // @ts-expect-error: Property 'pop' does not exist on type 'Array<number>'.
    const __cs_last = cs.const(cs.receiver(__cs_coins).pop());
    return cs.const(1);
})());

const action = cs.lift((() => {
    const __cs_coins = cs.const([1, 2]);
    // @ts-expect-error: Property 'push' does not exist on type 'Array<number>'.
    cs.statement(cs.receiver(__cs_coins).push(3));
})());
