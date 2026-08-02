import { cs } from "@backtickjs/core";

// `Math` is reachable, but only as `ClientMath` fixes it. What is left out is
// left out on purpose: `sin`, `cos`, `exp`, `log` and `pow` are not specified
// to the last bit by IEEE 754, so two conforming hosts may disagree about
// them. (`random` disagrees with itself, and is admitted anyway — see
// `ClientMath`.)
export const transcendental = cs.lift(cs.const(cs.receiver(Math).sin(1)));

export const raised = cs.lift(cs.const(cs.receiver(Math).pow(2, 8)));

// `min` takes at least one argument, where the standard library takes none and
// answers `Infinity` — an empty answer that isn't this language's absent one.
export const empty = cs.lift(cs.const(cs.receiver(Math).min()));
