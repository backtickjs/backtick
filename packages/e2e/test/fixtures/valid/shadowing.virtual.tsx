import { cs, type Client } from "@backtickjs/core";

export default cs.lift(cs.const((() => {
    const __cs_total = cs.const(1);
    return cs.splice(add(cs.lift(cs.const(__cs_total)), 100));
})()));

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs.lift(cs.const((() => {
    let __cs_total = cs.let(0);
    __cs_total = cs.const(__cs_total + cs.splice((lhs)));
    __cs_total = cs.const(__cs_total + cs.splice((rhs)));
    return __cs_total;
})()));
}
