import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstBlock implements AstNode {
  private readonly statements: readonly AstNode[];

  constructor(_loc: SourceLocation, statements: AstNode[]) {
    this.statements = statements;
  }

  debugPrint(): string {
    if (this.statements.length === 0) {
      return "{}";
    }
    const body = this.statements
      .map((statement) =>
        statement
          .debugPrint()
          .split("\n")
          .map((line) => (line.length > 0 ? `  ${line}` : line))
          .join("\n"),
      )
      .join("\n");
    return `{\n${body}\n}`;
  }
}
