import type { Client } from "./Client.js";
import type { ClientObject } from "./ClientObject.js";
import { create } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export type Spliceable =
  | Client<ClientUnknown>
  | ClientObject
  | null
  | number
  | boolean
  | string
  | Spliceable[]
  | { [key: string]: Spliceable };

export type AsObject<T> = {
  [K in Exclude<keyof T, "@backtickjs"> as T[K] extends Spliceable
    ? K
    : never]: Lower<T[K]>;
};

// Recursively lowers a Spliceable type:
//   Client<U>        -> U
//   ClientObject     -> AsObject of the class
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
export type Lower<T> =
  T extends Client<infer U>
    ? U
    : T extends ClientObject
      ? AsObject<T>
      : T extends (infer Item)[]
        ? Lower<Item>[]
        : T extends object
          ? { [Tk in keyof T]: Lower<T[Tk]> }
          : T;

function lift<const T extends ClientUnknown>(_value: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function lower<const T extends Spliceable>(_value: T): Lower<T> {
  throw new Error(
    "Don't call `cs.lower` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

export const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  { lift, lower, create },
);
