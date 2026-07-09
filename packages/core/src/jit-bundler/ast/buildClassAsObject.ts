import {
  type Client,
  type ClientUnknown,
  spliceableEntries,
} from "../../cs-runtime/index.js";
import { buildSplice } from "./buildSplice.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";

const nodeByInstance = new WeakMap<Client<ClientUnknown>, RuntimeObject>();

export function buildClassAsObject(value: Client<ClientUnknown>): AstNode {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  const entries: { [key: string]: AstNode } = {};
  for (const [key, entry] of spliceableEntries(value)) {
    entries[key] = buildSplice(entry);
  }

  const node = new RuntimeObject(entries);
  nodeByInstance.set(value, node);
  return node;
}
