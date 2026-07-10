import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";
import type { AstScriptIdentifier } from "./AstScriptIdentifier.js";

export class AstScriptArrow {
  readonly loc: SourceLocation;
  readonly params: readonly AstScriptIdentifier[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    params: readonly AstScriptIdentifier[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.params = params;
    this.body = body;
  }
}
