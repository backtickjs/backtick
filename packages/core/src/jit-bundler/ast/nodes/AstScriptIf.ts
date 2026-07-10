import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptIf {
  readonly kind: "AstScriptIf";
  readonly loc: SourceLocation;
  readonly condition: AstNode;
  readonly consequent: AstNode;
  readonly alternate: AstNode | null;
}
