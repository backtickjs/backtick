import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";

const shadowing = cs.lift((() => {
    const __cs_total = cs.const(1);
    return cs.const(cs.splice(addOwnTotal(cs.lift(cs.const(__cs_total)), 100)) satisfies typeof cs.ClientUnknown);
})());

function addOwnTotal(lhs: Client<number>, rhs: number): Client<number> {
  return cs.lift((() => {
    let __cs_total = 0;
    __cs_total = cs.const(__cs_total + (cs.splice((lhs)) satisfies typeof cs.ClientUnknown));
    __cs_total = cs.const(__cs_total + (cs.splice((rhs)) satisfies typeof cs.ClientUnknown));
    return cs.const(__cs_total);
})());
}
