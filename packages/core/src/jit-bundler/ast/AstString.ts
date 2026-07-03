import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstString implements AstNode {
  private readonly value: string;

  constructor(_loc: SourceLocation, value: string) {
    this.value = value;
  }

  debugPrint(): string {
    return `"${this.value}"`;
  }
}
