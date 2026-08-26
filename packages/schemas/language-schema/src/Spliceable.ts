import type { Client } from "./Client.js";
import type { Server } from "./Server.js";
import type {
  ClientHandle,
  ClientUnknown,
  ClientValue,
} from "./schema.generated.js";

/**
 * What the host may splice where the client wants a `T`: the value written out,
 * a script standing in for it, or a container mixing the two.
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
