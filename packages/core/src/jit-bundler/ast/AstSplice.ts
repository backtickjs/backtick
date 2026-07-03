import type { SourceLocation, Spliceable } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstSplice implements AstNode {
  private readonly key: string;

  constructor(_loc: SourceLocation, key: string, _expression: Spliceable) {
    this.key = key;
  }

  debugPrint(): string {
    return `\${${this.key}}`;
  }
}
