import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptReturn {
  readonly kind: "AstScriptReturn";
  readonly loc: SourceLocation;
  readonly expression: AstNode;
}
