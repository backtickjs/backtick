import { cs } from "@backtickjs/core";

// `?` marks an optional parameter — sugar for `T | undefined`. A caller may
// pass `undefined` where the argument is not supplied; `null` is a value of
// its own and not accepted here.
const greet = cs`(name?: string) => {
  return name?.concat("!");
}`;

// A function-typed annotation unions parenthesized: `(() => number) | undefined`.
const double = cs`() => 2`;

const call = cs`(cb?: () => number) => {
  return cb?.() ?? 0;
}`;

export default cs`({
  named: $greet("hi"),
  explicit: $greet(undefined),
  supplied: $call($double),
  fallback: $call(undefined),
})`;
