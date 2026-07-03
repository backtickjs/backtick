import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstIf implements AstNode {
  private readonly condition: AstNode;
  private readonly consequent: AstNode;
  private readonly alternate: AstNode | null;

  constructor(
    _loc: SourceLocation,
    condition: AstNode,
    consequent: AstNode,
    alternate: AstNode | null,
  ) {
    this.condition = condition;
    this.consequent = consequent;
    this.alternate = alternate;
  }

  debugPrint(): string {
    const head = `if (${this.condition.debugPrint()}) ${this.consequent.debugPrint()}`;
    if (this.alternate === null) {
      return head;
    }
    return `${head} else ${this.alternate.debugPrint()}`;
  }
}
