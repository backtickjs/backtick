import type { Spliceable } from "./Spliceable.js";
import type {
  ClientFunction,
  ClientHandle,
  ClientValue,
} from "./schema.generated.js";

/**
 * What the server may write for a client value of type `T`: the pair to
 * `Client<T>`, which is what it writes instead where it cannot.
 *
 * A container member by member, a handle and a primitive as themselves, and a
 * function not at all — client behaviour is `cs`...`, so a server function has
 * no written form, and neither has `void`.
 *
 * The parameter is unbounded on purpose: the last arm is the bound, and reading
 * it as one here would mean routing `void` before it arrives — a conditional in
 * `Spliceable` that costs either the alias in a refusal or what the
 * unparameterised name means.
 */
export type Server<T> = T extends ClientFunction
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
