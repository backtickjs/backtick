import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptVariableDeclaration {
  readonly kind: "AstScriptVariableDeclaration";
  readonly loc: SourceLocation;
  readonly keyword: "let" | "const";
  readonly name: AstNode;
  readonly expression: AstNode;
}
