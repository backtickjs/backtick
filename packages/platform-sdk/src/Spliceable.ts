import type { Client } from "./Client.js";
import type {
  ClientFunction,
  ClientHandle,
  ClientUnknown,
  ClientValue,
} from "./declarations.generated.js";

/**
 * What a host value of type `T` splices to: the pair to `Client<T>`, which is
 * what a host writes instead where it cannot write the value itself.
 *
 * A container member by member, a handle and a primitive as themselves, and a
 * function not at all — client behaviour is `cs`...`, so a host function has no
 * written form, and neither has `void`.
 *
 * The parameter is unbounded on purpose: the last arm is the bound, and reading
 * it as one here would mean routing `void` before it arrives — a conditional in
 * `Spliceable` that costs either the alias in a refusal or what the
 * unparameterised name means.
 */
type SplicesTo<T> = T extends ClientFunction
  ? never
  : T extends readonly (infer Item extends ClientValue)[]
    ? readonly Spliceable<Item>[]
    : T extends ClientHandle
      ? T
      : T extends { readonly [key: string]: ClientValue }
        ? { readonly [Key in keyof T]: Spliceable<T[Key]> }
        : T extends ClientValue
          ? T
          : never;

/**
 * What the host may splice where the client wants a `T`: the value written out,
 * a script standing in for it, or a container mixing the two.
 *
 * Where the client wants anything (`T` left as `ClientUnknown`), any client
 * value will do — a framework's function is the client's to hold, whatever it
 * is — while what the host writes out is still held to what it can write.
 */
export type Spliceable<T = ClientUnknown> =
  | Client<ClientUnknown extends T ? unknown : T>
  | SplicesTo<T>;

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   ClientHandle              -> unchanged
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> = [Spliceable] extends [T]
  ? ClientValue
  : T extends Client<infer U>
    ? U
    : T extends ClientHandle
      ? T
      : T extends readonly (infer Item extends Spliceable<ClientValue>)[]
        ? Spliced<Item>[]
        : T extends { readonly [key: string]: Spliceable<ClientValue> }
          ? { -readonly [K in keyof T]: Spliced<T[K]> }
          : T;
