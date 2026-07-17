import type { Client } from "./Client.js";
import type { ClientConstructor } from "./ClientConstructor.js";
import { type ClientObject, isClientObject } from "./ClientObject.js";
import { isClientScript } from "./ClientScript.js";
import { type ClientElement, isClientElement } from "./ClientElement.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export type Spliceable =
  | Client<ClientUnknown>
  | ClientElement
  | ClientConstructor
  | ClientObject
  | null
  | number
  | boolean
  | string
  | Spliceable[]
  | { [key: string]: Spliceable };

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   ClientElement             -> JSX.Element
//   ClientConstructor         -> typeof C, the spliced class C itself
//   T implements ClientObject -> T
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> =
  T extends Client<infer U>
    ? U
    : T extends ClientElement
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
    isClientElement(value) ||
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
