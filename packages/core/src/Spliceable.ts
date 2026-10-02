import type { Client } from "./Client.js";

/**
 * What the host may splice: the value written out, a script standing in for
 * it, or a container mixing the two. Not a host function, which is host code:
 * a client function is a script, cs`(n: number) => …`. An index signature rather than a mapped
 * type, so it can be named in a `satisfies` without a type to walk.
 */
export type Spliceable =
  | Client<unknown>
  | null
  | undefined
  | number
  | boolean
  | string
  | readonly Spliceable[]
  | { readonly [key: string]: Spliceable };

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> =
  T extends Client<infer U>
    ? U
    : T extends readonly (infer Item extends Spliceable)[]
      ? Spliced<Item>[]
      : T extends { readonly [key: string]: Spliceable }
        ? { -readonly [K in keyof T]: Spliced<T[K]> }
        : T;
