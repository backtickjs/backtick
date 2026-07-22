import { cs } from "@backtickjs/core";

export default cs.lift(cs.const((() => {
    const __cs_base = cs.const(10);
    return (__cs_one: number, __cs_two: number) => __cs_one + __cs_two + __cs_base;
})()));
