import type { Metadata, SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstClientScript implements AstNode {
  readonly loc: SourceLocation;
  readonly expression: AstNode;

  constructor(loc: SourceLocation, _metadata: Metadata, expression: AstNode) {
    this.loc = loc;
    this.expression = expression;
  }
}
