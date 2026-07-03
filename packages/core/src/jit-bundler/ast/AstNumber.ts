import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";
import { debugPrinter } from "../debugPrinter.js";

export class AstNumber implements AstNode {
  private readonly value: number;

  constructor(_loc: SourceLocation, value: number) {
    this.value = value;
  }

  debugPrint(): string {
    return debugPrinter(this.value);
  }
}
