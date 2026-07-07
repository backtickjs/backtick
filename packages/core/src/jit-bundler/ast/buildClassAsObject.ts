import { type Client, isClientScript } from "../../cs-runtime/index.js";
import { buildClientScript } from "./buildClientScript.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";

export function buildClassAsObject(value: Client<unknown>): AstNode {
  const entries: { [key: string]: AstNode } = {};
  // Reflect the object's data: its own fields plus any inherited getters (a
  // class exposes computed data — including nested client scripts — through
  // getters, which aren't own enumerable properties). Lower each as a spliced
  // value, skipping anything that isn't `Spliceable` — e.g. the phantom
  // `Client<T>` marker field (an own property holding `undefined`), or
  // methods/getters that reflect no data.
  for (const key of reflectableKeys(value)) {
    const entry = (value as unknown as Record<string, unknown>)[key];
    if (!isClientScript(entry)) {
      continue;
    }
    entries[key] = buildClientScript(entry);
  }
  return new RuntimeObject(entries);
}

// The string-keyed properties of `value` and its prototype chain, own keys
// first and each key yielded once (an own key shadows an inherited one). Stops
// at `Object.prototype` so built-in members (`toString`, `constructor`, …) are
// never reflected.
function reflectableKeys(value: object): string[] {
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
