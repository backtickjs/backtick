import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstBinop implements AstNode {
  private readonly lhs: AstNode;
  private readonly operator: string;
  private readonly rhs: AstNode;

  constructor(
    _loc: SourceLocation,
    lhs: AstNode,
    operator: string,
    rhs: AstNode,
  ) {
    this.lhs = lhs;
    this.operator = operator;
    this.rhs = rhs;
  }

  debugPrint(): string {
    return `${this.lhs.debugPrint()} ${this.operator} ${this.rhs.debugPrint()}`;
  }
}
