import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstScriptBlock {
  readonly loc: SourceLocation;
  readonly statements: readonly AstNode[];

  constructor(loc: SourceLocation, statements: AstNode[]) {
    this.loc = loc;
    this.statements = statements;
  }
}
