import { cs } from "@backtickjs/core";

export default cs.lift((() => {
    const __cs_x = cs.const(0);
    return cs.const(cs.splice(cs.lift(cs.const(__cs_x))) satisfies import("@backtickjs/core").ClientUnknown);
})());
