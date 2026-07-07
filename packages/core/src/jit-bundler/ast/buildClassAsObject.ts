import { type Client, isClient } from "../../cs-runtime/index.js";
import { buildSplice } from "./buildSplice.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";

const nodeByInstance = new WeakMap<Client<unknown>, RuntimeObject>();

export function buildClassAsObject(value: Client<unknown>): AstNode {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  const entries: { [key: string]: AstNode } = {};
  // Keep exactly the members whose type is Client-marked and lower each.
  for (const key of objectKeys(value)) {
    const entry = (value as unknown as Record<string, unknown>)[key];
    if (!isClient(entry)) {
      continue;
    }
    entries[key] = buildSplice(entry);
  }

  const node = new RuntimeObject(entries);
  nodeByInstance.set(value, node);
  return node;
}

// The string-keyed properties of `value` and its prototype chain, own keys
// first and each key yielded once (an own key shadows an inherited one). Stops
// at `Object.prototype` so built-in members (`toString`, `constructor`, …) are
// never reflected.
function objectKeys(value: object): string[] {
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
