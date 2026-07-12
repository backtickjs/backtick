import type { ClientObject } from "./ClientObject.js";
import { isSpliceable, type Spliceable } from "./Spliceable.js";

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
