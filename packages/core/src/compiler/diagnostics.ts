import type { DiagnosticCategory } from "typescript";
import type { SourceRange } from "./SourceRange.js";

export interface Diagnostic {
  range: SourceRange;
  message: string;
  category: DiagnosticCategory;
  code: number;
}
