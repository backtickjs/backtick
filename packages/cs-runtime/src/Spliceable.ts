import type { Client, ClientValue } from "@backtickjs/language-schema";
import type { ClientElement } from "@backtickjs/ui-schema";
import { isClientScript } from "./ClientScript.js";
import { isJsxElement } from "./JsxElement.js";

export type SpliceableValue =
  | Client<ClientValue>
  | ClientElement
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
//   ClientElement           -> JSX.Element
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> = [SpliceableValue] extends [T]
  ? ClientValue
  : T extends Client<infer U>
    ? U
    : T extends ClientElement
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
