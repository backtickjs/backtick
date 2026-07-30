import { cs } from "@backtickjs/core";

// The operand of `!` is a condition, so a number is a type error rather than
// a coercion.
export default cs.lift(cs.const((__cs_count: number) => !(cs.condition(__cs_count) && __cs_count)));
