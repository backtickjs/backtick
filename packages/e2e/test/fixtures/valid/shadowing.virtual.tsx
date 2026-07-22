import { cs, type Client } from "@backtickjs/core";

export default cs.lift(cs.value((() => {
    const __cs_total = cs.value(1);
    return cs.splice(add(cs.lift(cs.value(__cs_total)), 100));
})()));

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs.lift(cs.value((() => {
    let __cs_total = cs.widen(0);
    __cs_total = cs.value(__cs_total + cs.splice((lhs)));
    __cs_total = cs.value(__cs_total + cs.splice((rhs)));
    return __cs_total;
})()));
}
