import type { SourceLocation } from "../../cs-runtime/index.js";

export class SourceNull {
  readonly loc: SourceLocation;

  constructor(loc: SourceLocation) {
    this.loc = loc;
  }
}
