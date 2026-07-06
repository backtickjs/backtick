import type { SourceLocation } from "../../../cs-runtime/index.js";

export class SourceIdentifier {
  readonly loc: SourceLocation;
  // The identifier as written in source (e.g. `total`).
  readonly name: string;
  // The globally unique key of the binding this identifier refers to (e.g.
  // `total$1vq2eey_0`); equal to `name` for a free host reference.
  readonly bindingKey: string;

  constructor(loc: SourceLocation, name: string, bindingKey: string) {
    this.loc = loc;
    this.name = name;
    this.bindingKey = bindingKey;
  }
}
