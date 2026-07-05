import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceClientScript {
  readonly loc: SourceLocation;
  readonly splices: AstNode[];
  readonly freeVars: string[];
  readonly expression: AstNode;

  constructor(
    loc: SourceLocation,
    splices: AstNode[],
    freeVars: string[],
    expression: AstNode,
  ) {
    this.loc = loc;
    this.splices = splices;
    this.freeVars = freeVars;
    this.expression = expression;
  }
}
