import { cs } from "@backtickjs/core";

// A builtin is a value, not only a callee. The compiler folds `Math.floor` into
// one whole name the client answers — there is no `Math` for a read to yield —
// and that name stands wherever a value does: bound to a variable, and handed
// to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
const builtinAsValue = cs.lift((() => {
    const __cs_floor = cs.const(cs.receiver(Math).floor);
    const __cs_apply = cs.const((__cs_f: (n: number) => number, __cs_n: number) => __cs_f(__cs_n));
    return cs.const(__cs_floor(3.5) + __cs_apply(cs.receiver(Math).ceil, 3.5));
})());
