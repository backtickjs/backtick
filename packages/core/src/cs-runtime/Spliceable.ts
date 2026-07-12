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
