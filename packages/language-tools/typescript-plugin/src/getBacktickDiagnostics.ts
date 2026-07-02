import { BacktickVirtualCode } from "@backtick/language-plugin";
import type { Language } from "@volar/language-core";
import type * as ts from "typescript";

// Surfaces Backtick's own compiler diagnostics (e.g. unsupported syntax inside
// a `cs` client script) — the errors Backtick itself produces, which TypeScript
// knows nothing about. TypeScript's diagnostics already flow through the
// compiled embedded code; these are additive.
//
// The diagnostics are stored on the root virtual code in source coordinates,
// and `file`'s text mirrors the source 1:1, so the offsets map straight through
// with no translation. Works against any consumer that can supply the
// `Language` and the file's `SourceFile` — a language service (editor) or a
// program (command-line `tsc`).
export function getBacktickDiagnostics(
  language: Language<string> | undefined,
  file: ts.SourceFile | undefined,
  fileName: string,
): ts.Diagnostic[] {
  const root = language?.scripts.get(fileName)?.generated?.root;
  if (!(root instanceof BacktickVirtualCode)) {
    return [];
  }

  return root.diagnostics.map((diagnostic) => ({
    file,
    start: diagnostic.range.start,
    length: diagnostic.range.end - diagnostic.range.start,
    messageText: diagnostic.message,
    category: diagnostic.category,
    code: 0,
    source: "backtick",
  }));
}
