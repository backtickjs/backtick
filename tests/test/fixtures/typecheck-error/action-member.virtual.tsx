import { cs } from "@backtickjs/core";

// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.lift((() => {
    const __cs_x = cs.const(1);
})());

export default cs.lift((() => {
    const __cs_list = cs.const(cs.splice([action]) satisfies import("@backtickjs/core").ClientUnknown);
    return cs.const(1);
})());
