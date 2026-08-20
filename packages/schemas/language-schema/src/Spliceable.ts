import type { Client } from "./Client.js";
import type { Server } from "./Server.js";
import type {
  ClientHandle,
  ClientUnknown,
  ClientValue,
} from "./schema.generated.js";

export type SpliceableValue =
  | Client<ClientValue>
  | ClientHandle
  | null
  | number
  | boolean
  | string
  | readonly SpliceableValue[]
  | { readonly [key: string]: SpliceableValue };

/**
 * What the host may splice where the client wants a `T`: the value written out,
 * a script standing in for it, or a container mixing the two.
 *
 * Unparameterised it is everything spliceable — a value or an action — which is
 * what a value of no particular type is checked against.
 */
export type Spliceable<T extends ClientUnknown = ClientUnknown> =
  | Client<T>
  | Server<T>;

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   ClientHandle              -> unchanged
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T extends Spliceable> = [SpliceableValue] extends [T]
  ? ClientValue
  : T extends Client<infer U>
    ? U
    : T extends ClientHandle
      ? T
      : T extends readonly (infer Item extends Spliceable)[]
        ? Spliced<Item>[]
        : T extends { readonly [key: string]: Spliceable }
          ? { -readonly [K in keyof T]: Spliced<T[K]> }
          : T;
