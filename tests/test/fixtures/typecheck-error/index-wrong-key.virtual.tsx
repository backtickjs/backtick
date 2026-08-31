import { cs } from "@backtickjs/core";

// The client view decides what may index a value, exactly as it decides what
// may be read off it with `.`: an array takes a number — `"0"` is a string, and
// no amount of it looking like a number changes that — and a plain object takes
// only a key its type names.
const point = { x: 1, y: 2 };

export default cs.lift(cs.const((__cs_name: string) => {
    const __cs_coins = cs.const([5, 31, 7]);
    const __cs_first = cs.const(cs.index(__cs_coins, "0"));
    const __cs_wrong = cs.const(cs.index(__cs_coins, __cs_name));
    const __cs_which = cs.const(cs.index(cs.splice((point)) satisfies import("@backtickjs/core").ClientUnknown, __cs_name));
    return cs.const(__cs_first + __cs_wrong + __cs_which);
}));
