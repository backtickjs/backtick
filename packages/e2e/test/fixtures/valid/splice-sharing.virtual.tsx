import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.liftValue(cs.spliceValue((lhs)) + cs.spliceValue((rhs)));
}

export default cs.liftValue({ x: cs.spliceValue(add(cs.liftValue(1), cs.liftValue(2))), y: cs.spliceValue(add(cs.liftValue(3), cs.liftValue(4))) });
