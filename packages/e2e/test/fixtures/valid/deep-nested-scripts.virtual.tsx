import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.liftValue(cs.spliceValue((lhs)) + cs.spliceValue((rhs)));
}

export default cs.liftValue(cs.spliceValue(add(cs.liftValue(1), cs.liftValue(2))));
