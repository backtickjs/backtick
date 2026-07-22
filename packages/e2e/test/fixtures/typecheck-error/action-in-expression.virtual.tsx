import { cs } from "@backtickjs/core";

// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export const stored = cs.lift(cs.const((() => {
    const __cs_captured = cs.const(cs.splice((action)));
    return 1;
})()));

export const returned = cs.lift(cs.const((() => {
    return cs.splice((action));
})()));

export const assigned = cs.lift(cs.const((() => {
    try {
        return 1;
    }
    catch (__cs_e) {
        __cs_e = cs.const(cs.splice((action)));
        return 2;
    }
})()));
