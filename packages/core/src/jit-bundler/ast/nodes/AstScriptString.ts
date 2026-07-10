import type { SourceLocation } from "../../../cs-runtime/index.js";

export class AstScriptString {
  readonly loc: SourceLocation;
  readonly value: string;

  constructor(loc: SourceLocation, value: string) {
    this.loc = loc;
    this.value = value;
  }
}
