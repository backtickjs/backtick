import type { SourceLocation } from "../../../cs-runtime/index.js";

export class AstScriptSplice {
  readonly loc: SourceLocation;
  readonly index: number;

  constructor(loc: SourceLocation, index: number) {
    this.loc = loc;
    this.index = index;
  }
}
