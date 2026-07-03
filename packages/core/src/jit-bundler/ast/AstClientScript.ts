import type { Metadata, SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstClientScript implements AstNode {
  private readonly expression: AstNode;

  constructor(_loc: SourceLocation, _metadata: Metadata, expression: AstNode) {
    this.expression = expression;
  }

  debugPrint(): string {
    return `cs\`${this.expression.debugPrint()}\``;
  }
}
