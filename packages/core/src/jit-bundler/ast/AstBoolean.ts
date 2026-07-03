import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstBoolean implements AstNode {
  private readonly value: boolean;

  constructor(_loc: SourceLocation, value: boolean) {
    this.value = value;
  }

  debugPrint(): string {
    return this.value ? "true" : "false";
  }
}
