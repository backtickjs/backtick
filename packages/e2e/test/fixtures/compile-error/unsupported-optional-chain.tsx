import { cs } from "@backtickjs/core";

// `?.` propagates null one step, so a plain `.` after it — which JavaScript
// would short-circuit past — has no meaning; neither does `?.()`.
const mixed = cs`(o: { inner: { z: number } | null } | null) => {
  return o?.inner.z;
}`;

const optionalCall = cs`(f: (() => number) | null) => {
  return f?.();
}`;
