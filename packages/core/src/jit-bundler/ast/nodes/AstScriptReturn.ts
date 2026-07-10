import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstScriptReturn {
  readonly loc: SourceLocation;
  readonly expression: AstNode;

  constructor(loc: SourceLocation, expression: AstNode) {
    this.loc = loc;
    this.expression = expression;
  }
}
