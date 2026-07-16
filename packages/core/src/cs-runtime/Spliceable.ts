import type { Client } from "./Client.js";
import type { ClientConstructor } from "./ClientConstructor.js";
import { type ClientObject, isClientObject } from "./ClientObject.js";
import { isClientScript } from "./ClientScript.js";
import { isClientUIElement } from "./ClientUIElement.js";
import type { ClientUnknown } from "./ClientUnknown.js";

export type Spliceable =
  | Client<ClientUnknown>
  | ClientConstructor<ClientObject>
  | ClientObject
  | null
  | number
  | boolean
  | string
  | Spliceable[]
  | { [key: string]: Spliceable };

// What a spliceable becomes on the client:
//   Client<U>                 -> U
//   ClientConstructor<C>      -> typeof C
//   T implements ClientObject -> T
//   T[]                       -> Spliced<T>[]
//   { k: T }                  -> { k: Spliced<T> }
//   primitives                -> unchanged
export type Spliced<T> =
  T extends Client<infer U>
    ? U
    : T extends ClientConstructor<ClientObject>
      ? T
      : T extends ClientObject
        ? T
        : T extends (infer Item)[]
          ? Spliced<Item>[]
          : T extends object
            ? { [K in keyof T]: Spliced<T[K]> }
            : T;

// No function arm, though `Spliceable` admits `ClientConstructor`:
// reflection uses this to filter members, where a class is
// indistinguishable from a host method. A directly spliced class never
// reaches this guard.
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
