import type { SourceLocation } from "../../../cs-runtime/index.js";

export interface AstScriptString {
  readonly kind: "AstScriptString";
  readonly loc: SourceLocation;
  readonly value: string;
}
