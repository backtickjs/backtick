import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode, SourceNode } from "./AstNode.js";

export class AstPropertyAccess implements SourceNode {
  readonly loc: SourceLocation;
  readonly expression: AstNode;
  readonly name: string;

  constructor(loc: SourceLocation, expression: AstNode, name: string) {
    this.loc = loc;
    this.expression = expression;
    this.name = name;
  }
}
