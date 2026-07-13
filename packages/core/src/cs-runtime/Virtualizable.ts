import type { Client } from "./Client.js";

// The member-access view: what `cs.virtualize` wraps a `.` receiver in.
// A `Client`-typed member unwraps to its payload — `point.x` reads as
// `number` even though the field is declared `Client<number>` — and every
// other member stays as declared, so free host references (`console.log`)
// and primitive receivers (`greeting.concat`) keep their real surface. A
// `Client`-typed receiver unwraps first, then virtualizes.
export type Virtualize<T> =
  T extends Client<infer U>
    ? Virtualize<U>
    : T extends object
      ? { [K in keyof T]: T[K] extends Client<infer U> ? U : T[K] }
      : T;
