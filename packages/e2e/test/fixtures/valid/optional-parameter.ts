import { cs } from "@backtickjs/core";

// `?` marks a nullable parameter — sugar for `T | null`, not an optional
// argument: callers pass `null` explicitly, and `undefined` never arises.
const greet = cs`(name?: string) => {
  return name?.concat("!");
}`;

// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs`() => 2`;

const call = cs`(cb?: () => number) => {
  return cb?.() ?? 0;
}`;

export default cs`({
  named: $greet("hi"),
  explicit: $greet(null),
  supplied: $call($double),
  fallback: $call(null),
})`;
