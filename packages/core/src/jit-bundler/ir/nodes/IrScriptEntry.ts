import type { SourceLocation } from "../../../cs-runtime/index.js";
import type { AstNode } from "../../ast/AstNode.js";

export class IrScriptEntry {
  readonly loc: SourceLocation;
  readonly captures: readonly string[];
  readonly declarations: readonly string[];
  readonly body: AstNode;

  constructor(
    loc: SourceLocation,
    captures: readonly string[],
    declarations: readonly string[],
    body: AstNode,
  ) {
    this.loc = loc;
    this.captures = captures;
    this.declarations = declarations;
    this.body = body;
  }
}
