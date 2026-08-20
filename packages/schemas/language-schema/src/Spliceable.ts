import type { Client } from "./Client.js";
import type { ClientHandle, ClientValue } from "./schema.generated.js";

export type SpliceableValue =
  | Client<ClientValue>
  | ClientHandle
  | null
  | number
  | boolean
  | string
  | readonly SpliceableValue[]
  | { readonly [key: string]: SpliceableValue };

// Everything spliceable — a value or an action
export type Spliceable = SpliceableValue | Client<void>;

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   ClientHandle              -> unchanged
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> = [SpliceableValue] extends [T]
  ? ClientValue
  : T extends Client<infer U>
    ? U
    : T extends ClientHandle
      ? T
      : T extends readonly (infer Item)[]
        ? Spliced<Item>[]
        : T extends object
          ? { -readonly [K in keyof T]: Spliced<T[K]> }
          : T;
