import { cs } from "@backtickjs/core";

// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.liftAction((() => {
    const __cs_x = 1;
})());

export const stored = cs.liftValue((() => {
    const __cs_captured = (cs.value(cs.spliceValue((action))), cs.spliceValue((action)));
    return 1;
})());

export const returned = cs.liftValue((() => {
    return cs.spliceValue((action));
})());

export const assigned = cs.liftValue((() => {
    try {
        return 1;
    }
    catch (__cs_e) {
        __cs_e = (cs.value(cs.spliceValue((action))), cs.spliceValue((action)));
        return 2;
    }
})());
