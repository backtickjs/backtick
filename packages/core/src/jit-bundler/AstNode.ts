import type { SourceLocation } from "../cs-runtime/index.js";

export interface AstNode {
  readonly loc: SourceLocation;
}
