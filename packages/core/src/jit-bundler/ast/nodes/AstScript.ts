import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstScript {
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: AstNode[];
  readonly captures: string[];
  readonly declarations: string[];
  readonly expression: AstNode;

  constructor(
    loc: SourceLocation,
    fileHash: string,
    splices: AstNode[],
    captures: string[],
    declarations: string[],
    expression: AstNode,
  ) {
    this.loc = loc;
    this.fileHash = fileHash;
    this.splices = splices;
    this.captures = captures;
    this.declarations = declarations;
    this.expression = expression;
  }
}
