import type { SourceLocation } from "../../../cs-runtime/index.js";

export class AstScriptBoolean {
  readonly loc: SourceLocation;
  readonly value: boolean;

  constructor(loc: SourceLocation, value: boolean) {
    this.loc = loc;
    this.value = value;
  }
}
