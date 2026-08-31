import { cs } from "@backtickjs/core";

// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs`(n: number | null) => {
  return n === null ? 0 : n + 1;
}`;

export default cs`({
  absent: $pick(null),
  present: $pick(4),
})`;
