import type { SourceLocation } from "../../../cs-runtime/index.js";

export interface AstScriptIdentifier {
  readonly kind: "AstScriptIdentifier";
  readonly loc: SourceLocation;
  readonly name: string;
  readonly bindingKey: string;
}
