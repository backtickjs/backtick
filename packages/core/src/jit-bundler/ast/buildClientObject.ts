import {
  type ClientObject,
  isSpliceable,
  type Spliceable,
} from "../../cs-runtime/index.js";
import type { Ast, AstObject } from "./Ast.js";
import { buildAst } from "./buildAst.js";

const nodeByInstance = new WeakMap<ClientObject, Ast>();

export function buildClientObject(value: ClientObject): Ast {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  // The `lower()` escape hatch: the instance splices as the spliceable it
  // returns — lowered by the normal rules — instead of being reflected.
  if (typeof value.lower === "function") {
    const node = buildAst(value.lower());
    nodeByInstance.set(value, node);
    return node;
  }

  const entries: { [key: string]: Ast } = {};
  for (const [key, entry] of spliceableEntries(value)) {
    entries[key] = buildAst(entry);
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
