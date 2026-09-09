import { cs } from "@backtickjs/core";

// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export const stored = cs.lift((() => {
    const __cs_captured = cs.const(cs.splice((action)) satisfies typeof cs.ClientUnknown);
    return cs.const(1);
})());

export const returned = cs.lift((() => {
    return cs.const(cs.splice((action)) satisfies typeof cs.ClientUnknown);
})());

export const assigned = cs.lift((() => {
    try {
        return cs.const(1);
    }
    catch (__cs_e) {
        __cs_e = cs.const(cs.splice((action)) satisfies typeof cs.ClientUnknown);
        return cs.const(2);
    }
})());
