import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourcePropertyAccess {
  readonly loc: SourceLocation;
  readonly expression: AstNode;
  readonly name: string;

  constructor(loc: SourceLocation, expression: AstNode, name: string) {
    this.loc = loc;
    this.expression = expression;
    this.name = name;
  }
}
