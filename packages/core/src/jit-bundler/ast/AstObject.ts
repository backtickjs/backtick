import type { SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode, SourceNode } from "./AstNode.js";

export class AstObject implements SourceNode {
  readonly loc: SourceLocation;
  readonly entries: Readonly<Record<string, AstNode>>;

  constructor(loc: SourceLocation, entries: Record<string, AstNode>) {
    this.loc = loc;
    this.entries = entries;
  }
}
