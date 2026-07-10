import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstScriptBinop {
  readonly loc: SourceLocation;
  readonly lhs: AstNode;
  readonly operator: string;
  readonly rhs: AstNode;

  constructor(
    loc: SourceLocation,
    lhs: AstNode,
    operator: string,
    rhs: AstNode,
  ) {
    this.loc = loc;
    this.lhs = lhs;
    this.operator = operator;
    this.rhs = rhs;
  }
}
