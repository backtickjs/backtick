import type { Client } from "./Client.js";

/**
 * A host function the bundler can expand: run once against a hole per
 * parameter, so what it takes and what it answers with are scripts.
 */
type HostFunction = (...args: Client<never>[]) => Client<unknown>;

// Any host value that splices at all. An index signature rather than a mapped
// type, so it can be named in a `satisfies` without a type to walk.
type AnySpliceable =
  | null
  | undefined
  | number
  | boolean
  | string
  | Client<unknown>
  | HostFunction
  | readonly AnySpliceable[]
  | { readonly [key: string]: AnySpliceable };

/**
 * What a host value of type `T` splices to: the pair to `Client<T>`, which is
 * what a host writes instead where it cannot write the value itself.
 *
 * A container member by member, a primitive as itself, and a function as a
 * host function taking and answering with scripts. Where the client wants
 * anything, any host value that splices will do.
 */
type SplicesTo<T> = unknown extends T
  ? AnySpliceable
  : T extends (...args: infer Args) => infer Returned
    ? (...args: { [Key in keyof Args]: Client<Args[Key]> }) => Client<Returned>
    : T extends readonly (infer Item)[]
      ? readonly Spliceable<Item>[]
      : T extends { readonly [key: string]: unknown }
        ? { readonly [Key in keyof T]: Spliceable<T[Key]> }
        : T extends null | undefined | number | boolean | string
          ? T
          : never;

/**
 * What the host may splice where the client wants a `T`: the value written out,
 * a script standing in for it, or a container mixing the two.
 */
export type Spliceable<T = unknown> = Client<T> | SplicesTo<T>;

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   (Client<A>) => Client<R>  -> (A) => R
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> = [AnySpliceable] extends [T]
  ? unknown
  : T extends Client<infer U>
    ? U
    : T extends (...args: infer Args) => infer Returned
      ? (
          ...args: { [Key in keyof Args]: Spliced<Args[Key]> }
        ) => Spliced<Returned>
      : T extends readonly (infer Item extends Spliceable)[]
        ? Spliced<Item>[]
        : T extends { readonly [key: string]: Spliceable }
          ? { -readonly [K in keyof T]: Spliced<T[K]> }
          : T;
