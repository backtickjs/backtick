import { cs } from "@backtickjs/core";

// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs.lift(cs.const(1));

// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs.lift(cs.const((cs.condition((cs.splice((count)) satisfies typeof cs.ClientUnknown)) && (cs.splice((count)) satisfies typeof cs.ClientUnknown)) ? "some" : "none"));
