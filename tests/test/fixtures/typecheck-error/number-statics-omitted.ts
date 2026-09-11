import { cs } from "@backtickjs/core";

// `Number` is reachable only as the schema fixes it: `EPSILON`, `isFinite`,
// `isInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for — `isNaN` among them,
// since this language has no `NaN` for it to find.
export const largest = cs`Number.MAX_SAFE_INTEGER`;

export const notANumber = cs`Number.isNaN(1)`;
