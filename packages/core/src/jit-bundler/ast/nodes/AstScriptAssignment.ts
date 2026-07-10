import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptAssignment {
  readonly kind: "AstScriptAssignment";
  readonly loc: SourceLocation;
  readonly name: AstNode;
  readonly expression: AstNode;
}
