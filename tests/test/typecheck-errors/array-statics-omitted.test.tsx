import { cs } from "@backtickjs/core";

// `Array` is reachable, but only as the schema fixes it: `from` and `of`, and
// nothing else. `isArray` answers a question a script's types have already
// answered, and `new Array(n)` and `Array(n)` build an array of holes.
// @ts-expect-error: Property 'isArray' does not exist on type 'ArrayConstructor'.
export const tested = cs`Array.isArray([1])`;

// And the mapper is required, where the standard library makes it optional.
// Without one this answers with holes, and a hole reads as `undefined` — the
// one thing this language has no value for.
// @ts-expect-error: Expected 2 arguments, but got 1.
export const holes = cs`Array.from({ length: 3 })`;
