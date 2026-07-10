import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode, AstRoot } from "./AstNode.js";

export interface AstScript {
  readonly kind: "AstScript";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  // Splice values are host data lowered by `buildAst`, so they are roots —
  // never bare script-body nodes.
  readonly splices: readonly AstRoot[];
  readonly captures: readonly string[];
  readonly declarations: readonly string[];
  readonly expression: AstNode;
}
