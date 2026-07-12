import type { Client } from "./Client.js";
import { type ClientObject, isClientObject } from "./ClientObject.js";
import { isClientScript } from "./ClientScript.js";
import { isClientUIElement } from "./ClientUIElement.js";
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
//   Client<U>        -> U (a `ClientUIElement`'s `UIElement` included)
//   ClientObject     -> `Lower` of its `lower()` result when the class
//                       defines the escape hatch (the method returns a
//                       host-terms spliceable), else AsObject of the class
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
export type Lower<T> =
  T extends Client<infer U>
    ? U
    : T extends ClientObject
      ? T extends { lower(): infer R }
        ? Lower<R>
        : AsObject<T>
      : T extends (infer Item)[]
        ? Lower<Item>[]
        : T extends object
          ? { [Tk in keyof T]: Lower<T[Tk]> }
          : T;

export function isSpliceable(value: unknown): value is Spliceable {
  if (value === undefined) {
    return false;
  }
  if (
    isClientUIElement(value) ||
    isClientObject(value) ||
    isClientScript(value) ||
    value === null ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isSpliceable);
  }
  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === Object.prototype || prototype === null) &&
    Object.values(value).every(isSpliceable)
  );
}
