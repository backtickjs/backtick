import { cs } from "@backtickjs/core";

// A function is never spliceable — it can't cross the host/client boundary
// as data — so a function type is outside `Spliced`'s domain. An annotation
// can still name one, because the parameter receives a client-born function
// (here, a spliced script): the compiler leaves function-type annotations
// unwrapped, already client currency, instead of wrapping them in `Spliced`.
export default cs.lift((() => {
    const __cs_apply = (__cs_f: () => number) => __cs_f() + 1;
    return __cs_apply(cs.lower(cs.lift(() => 2)));
})());
