import { cs } from "@backtickjs/core";

// The operand of `!` is a condition, so a number is a type error rather than
// a coercion.
export default cs`(count: number) => !count`;
