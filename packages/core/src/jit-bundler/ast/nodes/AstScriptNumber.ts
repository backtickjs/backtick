import type { SourceLocation } from "../../../cs-runtime/index.js";

export interface AstScriptNumber {
  readonly kind: "AstScriptNumber";
  readonly loc: SourceLocation;
  readonly value: number;
}
