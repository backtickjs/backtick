import type { DiagnosticCategory } from "typescript";
import type { SourceRange } from "../cs-runtime/index.js";

export interface Diagnostic {
  range: SourceRange;
  message: string;
  category: DiagnosticCategory;
  code: number;
}
