import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";
import type { AstScriptIdentifier } from "./AstScriptIdentifier.js";

export interface AstScriptArrow {
  readonly kind: "AstScriptArrow";
  readonly loc: SourceLocation;
  readonly params: readonly AstScriptIdentifier[];
  readonly body: AstNode;
}
