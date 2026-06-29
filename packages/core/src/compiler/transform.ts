import type ts from "typescript";
import { parseFile } from "./parseFile.js";
import { rewriteFile } from "./rewriteFile.js";

export function transform(
  ts: typeof import("typescript"),
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => (sourceFile) => {
    const parsed = parseFile(ts, sourceFile.fileName, sourceFile.text);
    if (parsed.scripts.length === 0) {
      return sourceFile;
    }

    const rewrittenFile = rewriteFile(ts, parsed);

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

export default function transformer(
  _program?: unknown,
  _config?: unknown,
  extras?: { ts?: typeof import("typescript") },
): ts.TransformerFactory<ts.SourceFile> {
  const tsInstance = extras?.ts;
  if (!tsInstance) {
    throw new Error(
      "@backtick/core/transform: the plugin host did not provide a TypeScript instance.",
    );
  }
  return transform(tsInstance);
}
