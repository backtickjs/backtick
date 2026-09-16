import { cs } from "@backtickjs/core";

const nestedScripts = cs.lift((() => {
    const __cs_x = cs.const(0);
    return cs.const(cs.splice(cs.lift(cs.const(__cs_x))) satisfies typeof cs.ClientUnknown);
})());
