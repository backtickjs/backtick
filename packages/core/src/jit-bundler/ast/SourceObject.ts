import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceObject {
  readonly loc: SourceLocation;
  readonly entries: Readonly<Record<string, AstNode>>;

  constructor(loc: SourceLocation, entries: Record<string, AstNode>) {
    this.loc = loc;
    this.entries = entries;
  }
}
