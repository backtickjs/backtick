import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstIf implements AstNode {
  readonly loc: SourceLocation;
  readonly condition: AstNode;
  readonly consequent: AstNode;
  readonly alternate: AstNode | null;

  constructor(
    loc: SourceLocation,
    condition: AstNode,
    consequent: AstNode,
    alternate: AstNode | null,
  ) {
    this.loc = loc;
    this.condition = condition;
    this.consequent = consequent;
    this.alternate = alternate;
  }
}
