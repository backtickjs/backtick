import type { SourceRange } from "../cs-runtime/index.js";

export interface Diagnostic {
  range: SourceRange;
  message: string;
  severity: 1; // Error
}
