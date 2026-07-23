import { cs } from "@backtickjs/core";

// Rest parameters and defaults would be silently dropped from the bundle;
// `?` (sugar for `T | null`) is the supported form.
const rest = cs`(...values: number[]) => {
  return 1;
}`;

const defaulted = cs`(n: number = 2) => {
  return n;
}`;

const trailingRequired = cs`(name?: string, x: number) => {
  return x;
}`;
