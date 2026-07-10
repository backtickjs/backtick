import type { SourceLocation } from "../../../cs-runtime/index.js";

export class AstScriptNull {
  readonly loc: SourceLocation;

  constructor(loc: SourceLocation) {
    this.loc = loc;
  }
}
