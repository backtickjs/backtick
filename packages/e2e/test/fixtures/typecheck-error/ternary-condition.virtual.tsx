import { cs } from "@backtickjs/core";

// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs.lift(cs.const(1));

export default cs.lift(cs.const((cs.condition(cs.splice((count))) && cs.splice((count))) ? "some" : "none"));
