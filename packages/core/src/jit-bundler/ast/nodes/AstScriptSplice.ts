import type { SourceLocation } from "../../../cs-runtime/index.js";

export interface AstScriptSplice {
  readonly kind: "AstScriptSplice";
  readonly loc: SourceLocation;
  readonly index: number;
}
