import type { Client } from "../../cs-runtime/index.js";
import { buildAst } from "./buildAst.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";

export function buildObject(value: Client<unknown>): AstNode {
  const entries: { [key: string]: AstNode } = {};
  for (const [key, entry] of Object.entries(value)) {
    entries[key] = buildAst(entry);
  }
  return new RuntimeObject(entries);
}
