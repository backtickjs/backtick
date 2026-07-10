import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptPropertyAccess {
  readonly kind: "AstScriptPropertyAccess";
  readonly loc: SourceLocation;
  readonly expression: AstNode;
  readonly name: string;
}
