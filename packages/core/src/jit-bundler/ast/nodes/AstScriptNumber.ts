import type { SourceLocation } from "../../../cs-runtime/index.js";

export class AstScriptNumber {
  readonly loc: SourceLocation;
  readonly value: number;

  constructor(loc: SourceLocation, value: number) {
    this.loc = loc;
    this.value = value;
  }
}
