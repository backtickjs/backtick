import { cs } from "@backtickjs/core";

// What a global offers is written down rather than inherited from the host, and
// the compiler refuses the rest where it is written — a bundle written by hand
// never meets the typechecker, and neither does a script whose file is not
// being checked.
export const tested = cs`Array.isArray([1])`;

// Read rather than called, which is the same question asked of a different
// node.
export const held = cs`Math.SQRT3`;

// And what it does declare passes.
export const rounded = cs`Math.floor(1.5)`;
