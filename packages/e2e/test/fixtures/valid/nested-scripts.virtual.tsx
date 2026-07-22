import { cs } from "@backtickjs/core";

export default cs.lift(cs.const((() => {
    const __cs_x = cs.const(0);
    return cs.splice(cs.lift(cs.const(__cs_x)));
})()));
