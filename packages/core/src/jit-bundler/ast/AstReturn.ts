import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode, SourceNode } from "./AstNode.js";

export class AstReturn implements SourceNode {
  readonly loc: SourceLocation;
  readonly expression: AstNode;

  constructor(loc: SourceLocation, expression: AstNode) {
    this.loc = loc;
    this.expression = expression;
  }
}
