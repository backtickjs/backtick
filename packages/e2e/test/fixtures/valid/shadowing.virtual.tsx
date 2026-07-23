import { cs, type Client } from "@backtickjs/core";

export default cs.lift((() => {
    const __cs_total = cs.const(1);
    return cs.const(cs.splice(add(cs.lift(cs.const(__cs_total)), 100)));
})());

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs.lift((() => {
    let __cs_total = cs.let(0);
    __cs_total = cs.const(__cs_total + cs.splice((lhs)));
    __cs_total = cs.const(__cs_total + cs.splice((rhs)));
    return cs.const(__cs_total);
})());
}
