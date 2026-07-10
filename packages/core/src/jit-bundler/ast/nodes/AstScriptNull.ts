import type { SourceLocation } from "../../../cs-runtime/index.js";

export interface AstScriptNull {
  readonly kind: "AstScriptNull";
  readonly loc: SourceLocation;
}
