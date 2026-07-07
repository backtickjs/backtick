import { isClientScript, type Spliceable } from "../../cs-runtime/index.js";
import { buildAst } from "./buildAst.js";
import { buildObject } from "./buildObject.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeArray } from "./nodes/RuntimeArray.js";
import { RuntimeBoolean } from "./nodes/RuntimeBoolean.js";
import { RuntimeNull } from "./nodes/RuntimeNull.js";
import { RuntimeNumber } from "./nodes/RuntimeNumber.js";
import { RuntimeString } from "./nodes/RuntimeString.js";

// Lowers a value spliced into a client script to an AST node. Nested client
// scripts become their own AST (a `SourceNode`); every other value is a raw
// runtime value with no source location, so it becomes a `RuntimeNode`.
export function buildSplice(value: Spliceable): AstNode {
  if (isClientScript(value)) {
    return buildAst(value);
  }
  if (value === null) {
    return new RuntimeNull();
  }
  if (typeof value === "number") {
    return new RuntimeNumber(value);
  }
  if (typeof value === "boolean") {
    return new RuntimeBoolean(value);
  }
  if (typeof value === "string") {
    return new RuntimeString(value);
  }
  if (Array.isArray(value)) {
    return new RuntimeArray(value.map(buildSplice));
  }
  return buildObject(value);
}
