import { cs } from "@backtickjs/core";

// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number, and a plain object only
// a key its type names.
const point = { x: 1, y: 2 };

export default cs.lift(cs.const((__cs_name: string) => {
    const __cs_coins = cs.const([5, 31, 7]);
    const __cs_first = cs.const(cs.receiver(__cs_coins)[__cs_name]);
    const __cs_which = cs.const(cs.receiver(cs.splice((point)))[__cs_name]);
    return cs.const(__cs_first + __cs_which);
}));
