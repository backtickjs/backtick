import type { SourceLocation } from "../../cs-runtime/index.js";

export class SourceBoolean {
  readonly loc: SourceLocation;
  readonly value: boolean;

  constructor(loc: SourceLocation, value: boolean) {
    this.loc = loc;
    this.value = value;
  }
}
