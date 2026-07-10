import { cs, type Client } from "@backtickjs/core";

export default cs.lift((() => {
    const __cs_total = 1;
    return cs.lower(add(cs.lift(__cs_total), 100));
})());

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs.lift((() => {
    let __cs_total = 0;
    __cs_total = __cs_total + cs.lower(lhs);
    __cs_total = __cs_total + cs.lower(rhs);
    return __cs_total;
})());
}
