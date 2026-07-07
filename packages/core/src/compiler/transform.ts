import type ts from "typescript";
import { parseSourceFile } from "./parseFile.js";
import { rewriteFile } from "./rewriteFile.js";

export function transform(
  ts: typeof import("typescript"),
  addDiagnostic?: (diagnostic: ts.Diagnostic) => void,
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => (sourceFile) => {
    const parsedFile = parseSourceFile(ts, sourceFile);
    if (parsedFile.scripts.length === 0) {
      return sourceFile;
    }

    const rewrittenFile = rewriteFile(ts, parsedFile);

    if (addDiagnostic) {
      for (const diagnostic of rewrittenFile.diagnostics) {
        addDiagnostic({
          file: sourceFile,
          start: diagnostic.range.start,
          length: diagnostic.range.end - diagnostic.range.start,
          messageText: diagnostic.message,
          category: diagnostic.category,
          code: diagnostic.code,
          source: "backtick",
        });
      }
    }

    const byStart = new Map<number, ts.Node>();
    for (const [template, script] of rewrittenFile.scripts) {
      const start = template.getStart(rewrittenFile.sourceFile);
      byStart.set(start, script.runtime);
    }

    const visit: ts.Visitor = (node) => {
      if (
        ts.isTaggedTemplateExpression(node) &&
        ts.isIdentifier(node.tag) &&
        node.tag.text === "cs" &&
        node.pos >= 0
      ) {
        const runtime = byStart.get(node.getStart(rewrittenFile.sourceFile));
        if (runtime) {
          return ts.visitEachChild(runtime, visit, context);
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitNode(sourceFile, visit, ts.isSourceFile) as ts.SourceFile;
  };
}
