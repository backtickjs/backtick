import type { Client } from "./Client.js";
import {
  type AsObject,
  type ClientObject,
  isClientObject,
} from "./ClientObject.js";
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

// What a spliceable becomes on the client — recursively lowered:
//   Client<U>        -> U (a `ClientUIElement`'s `UIElement` included)
//   ClientObject     -> `Spliced` of its `spliced()` result when the class
//                       defines the escape hatch (the method returns a
//                       host-terms spliceable), else AsObject of the class
//   T[]              -> Spliced<T>[]
//   { k: T }         -> { k: Spliced<T> }
//   primitives       -> unchanged
export type Spliced<T> =
  T extends Client<infer U>
    ? U
    : T extends ClientObject
      ? T extends { spliced(): infer R }
        ? Spliced<R>
        : AsObject<T>
      : T extends (infer Item)[]
        ? Spliced<Item>[]
        : T extends object
          ? { [Tk in keyof T]: Spliced<T[Tk]> }
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
