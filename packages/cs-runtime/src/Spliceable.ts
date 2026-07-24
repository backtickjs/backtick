import type { Client } from "./Client.js";
import type { ClientConstructor } from "./ClientConstructor.js";
import { type ClientObject, isClientObject } from "./ClientObject.js";
import { isClientScript } from "./ClientScript.js";
import { type JsxElement, isJsxElement } from "./JsxElement.js";
import type { ClientValue } from "./ClientValue.js";

export type SpliceableValue =
  | Client<ClientValue>
  | JsxElement
  | ClientConstructor
  | ClientObject
  | null
  | number
  | boolean
  | string
  | SpliceableValue[]
  | { [key: string]: SpliceableValue };

// Everything spliceable — a value or an action
export type Spliceable = SpliceableValue | Client<void>;

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   JsxElement                -> JSX.Element
//   ClientConstructor         -> typeof C, the spliced class C itself
//   T implements ClientObject -> T
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
// A failed splice instantiates with the whole constraint; collapse that
// fallback to ClientValue so only the splice's own error reports.
export type Spliced<T> = [Spliceable] extends [T]
  ? ClientValue
  : T extends Client<infer U>
    ? U
    : T extends JsxElement
      ? T
      : T extends ClientConstructor
        ? T
        : T extends ClientObject
          ? T
          : T extends (infer Item)[]
            ? Spliced<Item>[]
            : T extends object
              ? { [K in keyof T]: Spliced<T[K]> }
              : T;

export function isSpliceable(value: unknown): value is Spliceable {
  if (value === undefined) {
    return false;
  }
  if (typeof value === "function") {
    // A deliberately spliced `ClientConstructor` never hits this check —
    // the bundler expands it directly. A function can only land here while
    // the bundler scans an object's members (or an element's props)
    // deciding what ships to the client: usually a host method, which must
    // not ship, but possibly a `ClientConstructor` stored in a field. At
    // runtime the two can look identical — a build tool may compile a
    // class into a plain function — so rather than guess, every function
    // is skipped. To ship a `ClientConstructor`, splice it directly.
    return false;
  }
  if (
    isJsxElement(value) ||
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
