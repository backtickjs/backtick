import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstAssignment implements AstNode {
  private readonly name: AstNode;
  private readonly expression: AstNode;

  constructor(_loc: SourceLocation, name: AstNode, expression: AstNode) {
    this.name = name;
    this.expression = expression;
  }

  debugPrint(): string {
    return `${this.name.debugPrint()} = ${this.expression.debugPrint()}`;
  }
}
