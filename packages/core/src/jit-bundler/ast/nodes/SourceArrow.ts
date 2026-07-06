import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "./AstNode.js";

export class SourceArrow {
  readonly loc: SourceLocation;
  // The parameter names as written (e.g. `r`), for display.
  readonly params: readonly string[];
  // The globally unique binding key of each parameter, index-aligned with
  // `params`; what the serializer emits and matches captures against.
  readonly bindings: readonly string[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    params: string[],
    bindings: string[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.params = params;
    this.bindings = bindings;
    this.body = body;
  }
}
