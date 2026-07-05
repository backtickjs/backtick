import type { SourceLocation } from "../../cs-runtime/index.js";
import type { SourceNode } from "./AstNode.js";

export class SourceString implements SourceNode {
  readonly loc: SourceLocation;
  readonly value: string;

  constructor(loc: SourceLocation, value: string) {
    this.loc = loc;
    this.value = value;
  }
}
