import type { SourceLocation } from "../../cs-runtime/index.js";
import type { SourceNode } from "./AstNode.js";

export class AstNumber implements SourceNode {
  readonly loc: SourceLocation;
  readonly value: number;

  constructor(loc: SourceLocation, value: number) {
    this.loc = loc;
    this.value = value;
  }
}
