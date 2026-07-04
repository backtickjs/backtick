import type { Client, SourceLocation } from "../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class AstThis implements AstNode {
  readonly loc: SourceLocation;
  readonly instance: Client<unknown>;

  constructor(loc: SourceLocation, ref: Client<unknown>) {
    this.loc = loc;
    this.instance = ref;
  }
}
