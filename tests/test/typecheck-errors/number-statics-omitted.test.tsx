import { cs } from "@backtickjs/core";

// `Number` is reachable only as the schema fixes it: `EPSILON`, `isFinite`,
// `isInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for — `isNaN` among them,
// since this language has no `NaN` for it to find.
// @ts-expect-error: Property 'MAX_SAFE_INTEGER' does not exist on type 'NumberConstructor'.
export const largest = cs`Number.MAX_SAFE_INTEGER`;

// @ts-expect-error: Property 'isNaN' does not exist on type 'NumberConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
export const notANumber = cs`Number.isNaN(1)`;
