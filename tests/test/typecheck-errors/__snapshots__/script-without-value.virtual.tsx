import { cs } from "@backtickjs/core";

// A script is one value, made at load, so one that makes no value is refused
// where it's written, a block or an expression: code that only does something
// is a function, called where it runs.

// @ts-expect-error: a script that makes no value
export const block = cs.lift((() => {
  window.console.log("logged");
})());

// @ts-expect-error: a script that makes no value
export const expression = cs.lift((() => window.console.log("logged"))());

export const logged = cs.lift((() => () => {
  window.console.log("logged");
})());

export const called = cs.lift((() => () => {
  (cs.splice((logged)))();
})());

// `undefined` is a value, and so is a script TypeScript can't type.
export const nothing = cs.lift((() => undefined)());
export const parsed = cs.lift((() => JSON.parse("{}"))());

// A script that always throws is a value too: it throws at load. Last, as
// TypeScript reads what follows it as unreachable.
export const thrown = cs.lift((() => {
  throw new Error("thrown");
})());
