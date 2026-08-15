import type { Client } from "./Client.js";
import { isClientScript } from "./ClientScript.js";
import { type JsxElement, isJsxElement } from "./JsxElement.js";
import type { ClientValue } from "./ClientValue.js";

export type SpliceableValue =
  | Client<ClientValue>
  | JsxElement
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
//   JsxElement                -> JSX.Element
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> = [SpliceableValue] extends [T]
  ? ClientValue
  : T extends Client<infer U>
    ? U
    : T extends JsxElement
      ? T
      : T extends readonly (infer Item)[]
        ? Spliced<Item>[]
        : T extends object
          ? { -readonly [K in keyof T]: Spliced<T[K]> }
          : T;

export function isSpliceable(value: unknown): value is Spliceable {
  if (value === undefined) {
    return false;
  }
  if (typeof value === "function") {
    // A function reaches here while the bundler scans an object's members (or
    // an element's props) deciding what ships: it is a host method, which does
    // not. Client code is written in `cs`...`` and reaches a script as one.
    return false;
  }
  if (
    isJsxElement(value) ||
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
