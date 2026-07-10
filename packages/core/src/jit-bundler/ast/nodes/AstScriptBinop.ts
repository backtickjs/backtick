import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptBinop {
  readonly kind: "AstScriptBinop";
  readonly loc: SourceLocation;
  readonly lhs: AstNode;
  readonly operator: string;
  readonly rhs: AstNode;
}
