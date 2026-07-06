import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceClientScript {
  readonly loc: SourceLocation;
  readonly splices: AstNode[];
  readonly captures: string[];
  readonly expression: AstNode;

  constructor(
    loc: SourceLocation,
    splices: AstNode[],
    captures: string[],
    expression: AstNode,
  ) {
    this.loc = loc;
    this.splices = splices;
    this.captures = captures;
    this.expression = expression;
  }
}
