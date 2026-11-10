import { cs } from "@backtickjs/core";

// A script is one value, made at load, so one that makes no value is refused
// where it's written, a block or an expression: code that only does something
// is a function, called where it runs.

// @ts-expect-error: a script that makes no value
export const block = cs`{
  window.console.log("logged");
}`;

// @ts-expect-error: a script that makes no value
export const expression = cs`window.console.log("logged")`;

export const logged = cs`() => {
  window.console.log("logged");
}`;

export const called = cs`() => {
  $logged();
}`;

// `undefined` is a value, and so is a script TypeScript can't type.
export const nothing = cs`undefined`;
export const parsed = cs`JSON.parse("{}")`;

// A script that always throws is a value too: it throws at load. Last, as
// TypeScript reads what follows it as unreachable.
export const thrown = cs`{
  throw new Error("thrown");
}`;
