import { cs } from "@backtickjs/core";

// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs`1`;

export default cs`$count ? "some" : "none"`;
