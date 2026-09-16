import { cs } from "@backtickjs/core";

// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
const splicedFunctionParam = cs.lift((() => {
    const __cs_apply = cs.const((__cs_f: () => number) => __cs_f() + 1);
    return cs.const(__cs_apply(cs.splice(cs.lift(cs.const(() => 2))) satisfies typeof cs.ClientUnknown));
})());
