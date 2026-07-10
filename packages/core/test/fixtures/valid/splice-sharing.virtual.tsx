import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.lower(lhs) + cs.lower(rhs));
}

export default cs.lift({ x: cs.lower(add(cs.lift(1), cs.lift(2))), y: cs.lower(add(cs.lift(3), cs.lift(4))) });
