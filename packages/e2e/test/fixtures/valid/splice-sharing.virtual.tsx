import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.liftValue(cs.splice((lhs)) + cs.splice((rhs)));
}

export default cs.liftValue({ x: cs.splice(add(cs.liftValue(1), cs.liftValue(2))), y: cs.splice(add(cs.liftValue(3), cs.liftValue(4))) });
