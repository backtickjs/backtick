import { cs } from "@backtickjs/core";

export default cs.liftValue((() => {
    const __cs_x = cs.value(0);
    return cs.spliceValue(cs.liftValue(__cs_x));
})());
