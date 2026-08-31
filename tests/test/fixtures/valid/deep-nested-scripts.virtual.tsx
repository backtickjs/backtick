import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs.lift(cs.const((cs.splice((lhs)) satisfies import("@backtickjs/core").ClientUnknown) + (cs.splice((rhs)) satisfies import("@backtickjs/core").ClientUnknown)));
}

export default cs.lift(cs.const(cs.splice(add(cs.lift(cs.const(1)), cs.lift(cs.const(2)))) satisfies import("@backtickjs/core").ClientUnknown));
