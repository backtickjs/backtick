import { cs } from "@backtickjs/core";

// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };

export default cs.lift(cs.const((__cs_name: string) => {
    const __cs_coins = cs.const([5, 31, 7]);
    const __cs_first = cs.const(__cs_coins["0"]);
    // @ts-expect-error: Element implicitly has an 'any' type because index expression is not of type 'number'.
    const __cs_wrong = cs.const(__cs_coins[__cs_name]);
    // @ts-expect-error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ x: number; y: number; }'.
    const __cs_which = cs.const((cs.splice((point)) satisfies typeof cs.ClientUnknown)[__cs_name]);
    return cs.const(__cs_first + __cs_wrong + __cs_which);
}));
