import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";
import type { SourceIdentifier } from "./SourceIdentifier.js";

export class SourceArrow {
  readonly loc: SourceLocation;
  readonly params: readonly SourceIdentifier[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    params: readonly SourceIdentifier[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.params = params;
    this.body = body;
  }
}
