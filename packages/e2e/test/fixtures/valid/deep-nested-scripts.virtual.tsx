import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.value(cs.splice((lhs)) + cs.splice((rhs)));
}

export default cs.value(cs.splice(add(cs.value(1), cs.value(2))));
