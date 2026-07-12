import type { Client } from "./Client.js";
import { type ClientObject, isClientObject } from "./ClientObject.js";
import { isClientScript } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import { isJSXElement, type JSXElement, type UIElement } from "./JSXElement.js";

export type Spliceable =
  | JSXElement
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
//   JSXElement       -> UIElement
//   Client<U>        -> U
//   ClientObject     -> AsObject of the class
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
export type Lower<T> = T extends JSXElement
  ? UIElement
  : T extends Client<infer U>
    ? U
    : T extends ClientObject
      ? AsObject<T>
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
    isJSXElement(value) ||
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

export function spliceableEntries(value: ClientObject): [string, Spliceable][] {
  const entries: [string, Spliceable][] = [];
  for (const key of objectKeys(value)) {
    if (key === "@backtickjs") {
      continue;
    }
    const entry = (value as unknown as Record<string, unknown>)[key];
    if (isSpliceable(entry)) {
      entries.push([key, entry]);
    }
  }
  return entries;
}

function objectKeys(value: ClientObject): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();
  let current: object | null = value;
  while (current && current !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(current)) {
      if (!seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
    current = Object.getPrototypeOf(current);
  }
  return keys;
}
