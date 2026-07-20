import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.liftValue(cs.splice((lhs)) + cs.splice((rhs)));
}

export default cs.liftValue(cs.splice(add(cs.liftValue(1), cs.liftValue(2))));
