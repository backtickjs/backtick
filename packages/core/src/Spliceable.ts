import type { Client } from "./Client.js";

/**
 * What the host may splice: the value written out, a script standing in for
 * it, or a container mixing the two. Not a host function, which is host code:
 * a client function is a script, cs`(n: number) => …`. Matches an object
 * through an index signature, which TypeScript gives a type alias but never an
 * interface: `SplicesAs` checks either.
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

/**
 * `T` as a splice checks it, member by member, so it takes an interface as a
 * type alias: `product satisfies SplicesAs<Product>`. What already is
 * `Spliceable` is as it is; a function, which can't cross, is checked against
 * `Spliceable`, and fails.
 */
export type SplicesAs<T> = [T] extends [Spliceable]
  ? T
  : T extends (...args: never) => unknown
    ? Spliceable
    : { readonly [K in keyof T]: SplicesAs<T[K]> };

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
      : T extends object
        ? { -readonly [K in keyof T]: Spliced<T[K]> }
        : T;
