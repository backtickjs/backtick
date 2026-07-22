import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.value(cs.splice((lhs)) + cs.splice((rhs))));
}

export default cs.lift(cs.value(cs.splice(add(cs.lift(cs.value(1)), cs.lift(cs.value(2))))));
