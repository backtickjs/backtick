import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "../AstNode.js";

export class AstNull implements AstNode {
  constructor(_loc: SourceLocation) {}

  debugPrint(): string {
    return "null";
  }
}
