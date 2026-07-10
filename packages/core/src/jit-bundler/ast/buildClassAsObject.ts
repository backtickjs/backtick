import {
  type Client,
  type ClientUnknown,
  spliceableEntries,
} from "../../cs-runtime/index.js";
import { buildAst } from "./buildAst.js";
import type { AstNode } from "./nodes/AstNode.js";
import { AstObject } from "./nodes/AstObject.js";

const nodeByInstance = new WeakMap<Client<ClientUnknown>, AstObject>();

export function buildClassAsObject(value: Client<ClientUnknown>): AstObject {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  const entries: { [key: string]: AstNode } = {};
  for (const [key, entry] of spliceableEntries(value)) {
    entries[key] = buildAst(entry);
  }

  const node = new AstObject(entries);
  nodeByInstance.set(value, node);
  return node;
}
