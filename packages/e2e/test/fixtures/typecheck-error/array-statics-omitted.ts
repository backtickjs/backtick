import { cs } from "@backtickjs/core";

// `Array` is reachable, but only as `ClientArrayStatics` fixes it: one member,
// because there is one thing the language cannot do for itself.
export const listed = cs`Array.of(1, 2)`;

export const tested = cs`Array.isArray([1])`;

// And the mapper is required, where the standard library makes it optional.
// Without one this answers with holes, and a hole reads as `undefined` — the
// one thing this language has no value for.
export const holes = cs`Array.from({ length: 3 })`;
