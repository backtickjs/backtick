import type { Client } from "./Client.js";

/**
 * What the host may splice: the value written out, a script standing in for
 * it, or a container mixing the two. An index signature rather than a mapped
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
  | { readonly [key: string]: Spliceable }
  // A host function, spliced to be used as a component (or a callback that
  // draws): expanded once per bundle against a hole per parameter, so it
  // arranges what the client will pass but can't compute with it. For
  // anything else, write a client function instead: cs`(n: number) => …`.
  | ((...args: never[]) => Spliceable);

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   (A) => R                  -> (Spliced<A>) => Spliced<R>
//   primitives                -> unchanged
export type Spliced<T> =
  T extends Client<infer U>
    ? U
    : T extends readonly (infer Item extends Spliceable)[]
      ? Spliced<Item>[]
      : T extends { readonly [key: string]: Spliceable }
        ? { -readonly [K in keyof T]: Spliced<T[K]> }
        : T extends (...args: infer Args) => infer R
          ? (...args: { [K in keyof Args]: Spliced<Args[K]> }) => Spliced<R>
          : T;
