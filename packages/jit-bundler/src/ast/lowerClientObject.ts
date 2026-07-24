import {
  type ClientObject,
  isClientScript,
  isSpliceable,
  type Spliceable,
} from "@backtickjs/cs-runtime";
import type { AstObject } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// Holds the in-flight promise, not the finished node: a second reference
// reaching this instance while it is still lowering joins the same work rather
// than starting a duplicate, which is what keeps the AST a DAG under
// concurrent lowering.
const nodeByInstance = new WeakMap<ClientObject, Promise<AstObject>>();

export function lowerClientObject(value: ClientObject): Promise<AstObject> {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }
  // memoized before the first await, so concurrent callers always see it
  const node = buildObject(value);
  nodeByInstance.set(value, node);
  return node;
}

async function buildObject(value: ClientObject): Promise<AstObject> {
  const entries = Object.fromEntries(
    await Promise.all(
      spliceableEntries(value).map(async ([key, entry]) => [
        key,
        await lowerSpliceable(entry, "ClientValue"),
      ]),
    ),
  );
  return { kind: "AstObject", entries };
}

function spliceableEntries(value: ClientObject): [string, Spliceable][] {
  const entries: [string, Spliceable][] = [];
  for (const key of objectKeys(value)) {
    if (key === "@backtickjs") {
      continue;
    }
    const entry = (value as unknown as Record<string, unknown>)[key];
    if (isClientScript(entry) && entry.metadata.kind === "action") {
      // An action member doesn't ship — it would run when the `ClientObject`
      // instantiates on the client, which is never the desired behavior.
      // This is almost always an error; the right fix is to declare the
      // member as a zero-arg function `Client<() => void>`.
      continue;
    }
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
