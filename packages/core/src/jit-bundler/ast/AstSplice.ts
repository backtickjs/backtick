import type { SourceLocation, Spliceable } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";
import { debugPrinter } from "../debugPrinter.js";

export class AstSplice implements AstNode {
  private readonly expression: Spliceable;

  constructor(_loc: SourceLocation, _key: string, expression: Spliceable) {
    this.expression = expression;
  }

  debugPrint(): string {
    return `\${${debugPrinter(this.expression)}}`;
  }
}
