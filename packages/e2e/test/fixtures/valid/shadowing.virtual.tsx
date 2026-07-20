import { cs, type Client } from "@backtickjs/core";

export default cs.value((() => {
    const __cs_total = 1;
    return cs.splice(add(cs.value(__cs_total), 100));
})());

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs.value((() => {
    let __cs_total = 0;
    __cs_total = __cs_total + cs.splice((lhs));
    __cs_total = __cs_total + cs.splice((rhs));
    return __cs_total;
})());
}
