import ts from "typescript";
import type { Diagnostic } from "../../dist/compiler/diagnostics.js";

// Render each diagnostic as `<line>:<col>-<line>:<col> <category> <code>: <message>`,
// with line/column numbers 1-based to match editor conventions. When there are no
// diagnostics, emit a single note so the snapshot documents the clean result.
export function renderDiagnostics(
  fileName: string,
  sourceText: string,
  diagnostics: Diagnostic[],
): string {
  if (diagnostics.length === 0) {
    return "No diagnostics.\n";
  }

  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
  );

  const position = (offset: number): string => {
    const { line, character } =
      sourceFile.getLineAndCharacterOfPosition(offset);
    return `${line + 1}:${character + 1}`;
  };

  return `${diagnostics
    .map((diagnostic) => {
      const start = position(diagnostic.range.start);
      const end = position(diagnostic.range.end);
      const category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
      return `${start}-${end} ${category} TS${diagnostic.code}: ${diagnostic.message}`;
    })
    .join("\n")}\n`;
}
