import { type ClientObject, isClientObject } from "./ClientObject.js";
import { isClientScript } from "./ClientScript.js";
import type { Spliceable } from "./cs.js";
import { isJSXElement } from "./JSXElement.js";

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
