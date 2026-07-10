import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptObject {
  readonly kind: "AstScriptObject";
  readonly loc: SourceLocation;
  readonly entries: Readonly<Record<string, AstNode>>;
}
