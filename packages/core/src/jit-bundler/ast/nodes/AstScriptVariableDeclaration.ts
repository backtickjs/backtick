import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstScriptVariableDeclaration {
  readonly loc: SourceLocation;
  readonly keyword: "let" | "const";
  readonly name: AstNode;
  readonly expression: AstNode;

  constructor(
    loc: SourceLocation,
    keyword: "let" | "const",
    name: AstNode,
    expression: AstNode,
  ) {
    this.loc = loc;
    this.keyword = keyword;
    this.name = name;
    this.expression = expression;
  }
}
