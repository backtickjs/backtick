import type { SourceLocation } from "../../../cs-runtime/index.js";

export interface AstScriptBoolean {
  readonly kind: "AstScriptBoolean";
  readonly loc: SourceLocation;
  readonly value: boolean;
}
