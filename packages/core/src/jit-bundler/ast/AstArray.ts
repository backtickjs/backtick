import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";
import { debugPrinter } from "../debugPrinter.js";

export class AstArray implements AstNode {
  private readonly elements: readonly AstNode[];

  constructor(_loc: SourceLocation, elements: AstNode[]) {
    this.elements = elements;
  }

  debugPrint(): string {
    return debugPrinter(this.elements);
  }
}
