import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.const((cs.splice((lhs)) satisfies typeof cs.ClientUnknown) + (cs.splice((rhs)) satisfies typeof cs.ClientUnknown)));
}

export default cs.lift(cs.const(cs.splice(add(cs.lift(cs.const(1)), cs.lift(cs.const(2)))) satisfies typeof cs.ClientUnknown));
