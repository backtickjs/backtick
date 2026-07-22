import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.const(cs.splice((lhs)) + cs.splice((rhs))));
}

export default cs.lift(cs.const({ x: cs.splice(add(cs.lift(cs.const(1)), cs.lift(cs.const(2)))), y: cs.splice(add(cs.lift(cs.const(3)), cs.lift(cs.const(4)))) }));
