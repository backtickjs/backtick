import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptCall {
  readonly kind: "AstScriptCall";
  readonly loc: SourceLocation;
  readonly callee: AstNode;
  readonly args: readonly AstNode[];
}
