import { cs } from "@backtickjs/core";

// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
export default cs.lift((() => {
    const __cs_front = cs.const([1, 2]);
    const __cs_back = cs.const([3]);
    const __cs_none = cs.const([]);
    const __cs_all = cs.const([0, ...__cs_front, ...__cs_none, ...__cs_back, 4]);
    const __cs_twice = cs.const([...__cs_all, ...__cs_all]);
    return cs.const(cs.receiver(__cs_all).join(",") + "|" + cs.receiver(__cs_twice).length);
})());
