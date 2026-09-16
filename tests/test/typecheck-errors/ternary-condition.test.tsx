import { cs } from "@backtickjs/core";

// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs`1`;

// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs`$count ? "some" : "none"`;
