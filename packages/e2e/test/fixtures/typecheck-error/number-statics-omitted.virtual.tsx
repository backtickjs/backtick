import { cs } from "@backtickjs/core";

// `Number` is reachable only as the schema fixes it: `EPSILON`, `isFinite`,
// `isInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for.
export const largest = cs.lift(cs.const(cs.receiver(Number).MAX_SAFE_INTEGER));

export const notANumber = cs.lift(cs.const(cs.receiver(Number).isNaN(1)));
