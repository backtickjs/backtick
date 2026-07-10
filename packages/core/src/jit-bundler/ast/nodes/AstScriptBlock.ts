import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptBlock {
  readonly kind: "AstScriptBlock";
  readonly loc: SourceLocation;
  readonly statements: readonly AstNode[];
}
