import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export interface AstScriptArray {
  readonly kind: "AstScriptArray";
  readonly loc: SourceLocation;
  readonly elements: readonly AstNode[];
}
