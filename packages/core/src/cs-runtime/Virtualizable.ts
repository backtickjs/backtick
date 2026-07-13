import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export type Virtualizable =
  | Client<ClientUnknown>
  | ClientObject
  | null
  | number
  | boolean
  | string
  | ((...args: never[]) => ClientUnknown)
  | Virtualizable[]
  | { [key: string]: Virtualizable };

export type Virtualized<T> =
  T extends Client<infer U>
    ? U
    : T extends ClientObject
      ? {
          [K in Exclude<keyof T, "@backtickjs"> as T[K] extends Virtualizable
            ? K
            : never]: Virtualized<T[K]>;
        }
      : T extends (...args: never[]) => unknown
        ? T
        : T extends (infer Item)[]
          ? Virtualized<Item>[]
          : T extends object
            ? { [K in keyof T]: Virtualized<T[K]> }
            : T;
