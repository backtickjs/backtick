import { cs } from "@backtickjs/core";

// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
export default cs.liftValue((() => {
    const __cs_apply = (__cs_f: () => number) => __cs_f() + 1;
    return __cs_apply(cs.spliceValue(cs.liftValue(() => 2)));
})());
