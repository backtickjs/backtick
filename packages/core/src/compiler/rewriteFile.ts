import type ts from "typescript";
import type { SourceRange } from "../cs-runtime/index.js";
import type { Diagnostic } from "./diagnostics.js";
import { flattenScripts } from "./flattenScripts.js";
import type { ParsedFile } from "./parseFile.js";
import { resolveBindings } from "./resolveBindings.js";
import { type RewrittenScript, rewriteScript } from "./rewriteScript.js";

export interface RewrittenFile {
  sourceFile: ts.SourceFile;
  scripts: Map<ts.TaggedTemplateExpression, RewrittenScript>;
  sourceMaps: Map<ts.Node, SourceRange>;
  diagnostics: Diagnostic[];
}

export function rewriteFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): RewrittenFile {
  const sourceFile = parsedFile.sourceFile;

  const scripts = new Map<ts.TaggedTemplateExpression, RewrittenScript>();
  const sourceMaps = new Map<ts.Node, SourceRange>();
  const diagnostics: Diagnostic[] = [];

  const { bindings, captures } = resolveBindings(
    ts,
    parsedFile.scripts,
    sourceFile.text,
  );

  for (const script of flattenScripts(parsedFile.scripts)) {
    const rewritten = rewriteScript(ts, script, bindings, captures.get(script));
    scripts.set(script.sourceNode, rewritten);
    for (const [node, range] of rewritten.sourceMaps) {
      sourceMaps.set(node, range);
    }
    diagnostics.push(...rewritten.diagnostics);
  }

  return { sourceFile, scripts, sourceMaps, diagnostics };
}
