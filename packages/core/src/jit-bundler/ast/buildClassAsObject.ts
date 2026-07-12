import {
  type ClientObject,
  type ClientUnknown,
  spliceableEntries,
} from "../../cs-runtime/index.js";
import type { Ast, AstObject } from "./Ast.js";
import { buildAst } from "./buildAst.js";

const nodeByInstance = new WeakMap<ClientObject<ClientUnknown>, AstObject>();

export function buildClassAsObject(
  value: ClientObject<ClientUnknown>,
): AstObject {
  const shared = nodeByInstance.get(value);
  if (shared) {
    return shared;
  }

  const entries: { [key: string]: Ast } = {};
  for (const [key, entry] of spliceableEntries(value)) {
    entries[key] = buildAst(entry);
  }

  const node: AstObject = { kind: "AstObject", entries };
  nodeByInstance.set(value, node);
  return node;
}
