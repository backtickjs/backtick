import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";
import { debugPrinter } from "../debugPrinter.js";

export class AstObject implements AstNode {
  private readonly entries: Readonly<Record<string, AstNode>>;

  constructor(_loc: SourceLocation, entries: Record<string, AstNode>) {
    this.entries = entries;
  }

  debugPrint(): string {
    return debugPrinter(this.entries);
  }
}
