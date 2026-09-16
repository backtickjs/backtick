import { cs } from "@backtickjs/core";

// The operand of `!` is a condition, so a number is a type error rather than
// a coercion.
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs`(count: number) => !count`;
