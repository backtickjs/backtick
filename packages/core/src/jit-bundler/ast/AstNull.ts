import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";
import { debugPrinter } from "../debugPrinter.js";

export class AstNull implements AstNode {
  constructor(_loc: SourceLocation) {}

  debugPrint(): string {
    return debugPrinter(null);
  }
}
