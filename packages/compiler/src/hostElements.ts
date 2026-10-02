import type ts from "typescript";
import type { Diagnostic } from "./diagnostics.js";
import { isComponentTag } from "./isComponentTag.js";

// Each element written in host code: an intrinsic element is drawn by the
// client, so it belongs in a script. Every JSX node TypeScript parsed is the
// host's, a splice's included, as a script's JSX is text in its template.
export function hostElementDiagnostics(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const { tagName } = node;
      const name = tagName.getText(sourceFile);
      // A member read (`ui.button`) is a value, whatever its case.
      const named = ts.isIdentifier(tagName) || ts.isJsxNamespacedName(tagName);
      if (named && !isComponentTag(name)) {
        diagnostics.push({
          range: { start: tagName.getStart(sourceFile), end: tagName.getEnd() },
          message:
            `\`<${name}>\` is drawn by the client, so it belongs in a ` +
            `script: cs\`<${name}>…</${name}>\`.`,
          category: ts.DiagnosticCategory.Error,
          code: 0,
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return diagnostics;
}
