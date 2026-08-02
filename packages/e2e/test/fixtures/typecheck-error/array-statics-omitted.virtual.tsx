import { cs } from "@backtickjs/core";

// `Array` is reachable, but only as `ClientArrayStatics` fixes it: one member,
// because there is one thing the language cannot do for itself.
export const listed = cs.lift(cs.const(cs.receiver(Array).of(1, 2)));

export const tested = cs.lift(cs.const(cs.receiver(Array).isArray([1])));

// And the mapper is required, where the standard library makes it optional.
// Without one this answers with holes, and a hole reads as `undefined` — the
// one thing this language has no value for.
export const holes = cs.lift(cs.const(cs.receiver(Array).from({ length: 3 })));
