import type { Metadata, SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstClientScript implements AstNode {
  readonly loc: SourceLocation;
  readonly metadata: Metadata;
  readonly expression: AstNode;

  constructor(loc: SourceLocation, metadata: Metadata, expression: AstNode) {
    this.loc = loc;
    this.metadata = metadata;
    this.expression = expression;
  }
}
