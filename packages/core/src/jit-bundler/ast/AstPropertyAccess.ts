import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstPropertyAccess implements AstNode {
  private readonly expression: AstNode;
  private readonly name: string;

  constructor(_loc: SourceLocation, expression: AstNode, name: string) {
    this.expression = expression;
    this.name = name;
  }

  debugPrint(): string {
    return `${this.expression.debugPrint()}.${this.name}`;
  }
}
