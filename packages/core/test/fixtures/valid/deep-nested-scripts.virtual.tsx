import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.lower(lhs) + cs.lower(rhs));
}

export default cs.lift(cs.lower(add(cs.lift(1), cs.lift(2))));
