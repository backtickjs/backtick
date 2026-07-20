import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.value(cs.splice((lhs)) + cs.splice((rhs)));
}

export default cs.value({ x: cs.splice(add(cs.value(1), cs.value(2))), y: cs.splice(add(cs.value(3), cs.value(4))) });
