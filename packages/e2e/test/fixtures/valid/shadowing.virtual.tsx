import { cs, type Client } from "@backtickjs/core";

export default cs.liftValue((() => {
    const __cs_total = 1;
    return cs.spliceValue(add(cs.liftValue(__cs_total), 100));
})());

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs.liftValue((() => {
    let __cs_total = 0;
    __cs_total = __cs_total + cs.spliceValue((lhs));
    __cs_total = __cs_total + cs.spliceValue((rhs));
    return __cs_total;
})());
}
