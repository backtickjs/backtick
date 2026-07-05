import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceAssignment {
  readonly loc: SourceLocation;
  readonly name: AstNode;
  readonly expression: AstNode;

  constructor(loc: SourceLocation, name: AstNode, expression: AstNode) {
    this.loc = loc;
    this.name = name;
    this.expression = expression;
  }
}
