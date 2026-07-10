import {
  type Client,
  type ClientUnknown,
  spliceableEntries,
} from "../../cs-runtime/index.js";
import type { AstObject, AstRoot } from "./AstNode.js";
import { buildAst } from "./buildAst.js";

const nodeByInstance = new WeakMap<Client<ClientUnknown>, AstObject>();

export function buildClassAsObject(value: Client<ClientUnknown>): AstObject {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  const entries: { [key: string]: AstRoot } = {};
  for (const [key, entry] of spliceableEntries(value)) {
    entries[key] = buildAst(entry);
  }

  const node: AstObject = { kind: "AstObject", entries };
  nodeByInstance.set(value, node);
  return node;
}
