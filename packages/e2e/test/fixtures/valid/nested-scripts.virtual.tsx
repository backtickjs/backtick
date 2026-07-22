import { cs } from "@backtickjs/core";

export default cs.lift(cs.value((() => {
    const __cs_x = cs.value(0);
    return cs.splice(cs.lift(cs.value(__cs_x)));
})()));
