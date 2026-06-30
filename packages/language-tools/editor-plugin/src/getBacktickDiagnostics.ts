import { BacktickVirtualCode } from "@backtick/language-plugin";
import type { Language } from "@volar/language-core";
import type * as ts from "typescript";

// Surfaces Backtick's own compiler diagnostics (e.g. unsupported syntax inside
// a `cs` client script) to the editor. TypeScript diagnostics already flow
// through the compiled embedded code; these are the errors Backtick itself
// produces, which TypeScript knows nothing about.
//
// The diagnostics are stored on the root virtual code in source coordinates.
// `getSemanticDiagnostics` reports against the user's file (whose text mirrors
// the source 1:1), so the offsets map straight through with no translation.
export function getBacktickDiagnostics(
  ts: typeof import("typescript"),
  inner: ts.LanguageService,
  language: Language<string> | undefined,
  fileName: string,
): ts.Diagnostic[] {
  const root = language?.scripts.get(fileName)?.generated?.root;
  if (!(root instanceof BacktickVirtualCode)) {
    return [];
  }

  const file = inner.getProgram()?.getSourceFile(fileName);
  return root.diagnostics.map((diagnostic) => ({
    file,
    start: diagnostic.range.start,
    length: diagnostic.range.end - diagnostic.range.start,
    messageText: diagnostic.message,
    category: ts.DiagnosticCategory.Error,
    code: 0,
    source: "backtick",
  }));
}
