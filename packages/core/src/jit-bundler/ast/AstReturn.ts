import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstReturn implements AstNode {
  private readonly expression: AstNode;

  constructor(_loc: SourceLocation, expression: AstNode) {
    this.expression = expression;
  }

  debugPrint(): string {
    return `return ${this.expression.debugPrint()};`;
  }
}
