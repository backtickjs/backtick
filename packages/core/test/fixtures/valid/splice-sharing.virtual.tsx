import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.splice(lhs) + cs.splice(rhs));
}

export default cs.lift({ x: cs.splice(add(cs.lift(1), cs.lift(2))), y: cs.splice(add(cs.lift(3), cs.lift(4))) });
