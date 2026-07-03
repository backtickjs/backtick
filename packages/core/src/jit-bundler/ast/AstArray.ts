import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstArray implements AstNode {
  private readonly elements: readonly AstNode[];

  constructor(_loc: SourceLocation, elements: AstNode[]) {
    this.elements = elements;
  }

  debugPrint(): string {
    return `[${this.elements.map((element) => element.debugPrint()).join(", ")}]`;
  }
}
