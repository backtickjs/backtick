import {
  type ClientObject,
  isSpliceable,
  type Spliceable,
} from "@backtickjs/cs-runtime";
import type { Ast, AstObject } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

const nodeByInstance = new WeakMap<ClientObject, AstObject>();

export function lowerClientObject(value: ClientObject): AstObject {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  const entries: { [key: string]: Ast } = {};
  for (const [key, entry] of spliceableEntries(value)) {
    entries[key] = lowerSpliceable(entry);
  }

  const node: AstObject = { kind: "AstObject", entries };
  nodeByInstance.set(value, node);
  return node;
}

function spliceableEntries(value: ClientObject): [string, Spliceable][] {
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
