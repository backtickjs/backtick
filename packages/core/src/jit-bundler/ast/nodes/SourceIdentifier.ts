import type { SourceLocation } from "../../../cs-runtime/index.js";

export class SourceIdentifier {
  readonly loc: SourceLocation;
  readonly name: string;

  constructor(loc: SourceLocation, name: string) {
    this.loc = loc;
    this.name = name;
  }
}
