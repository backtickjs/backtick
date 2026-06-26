import type ts from "typescript";
import { flattenScripts } from "./flattenScripts.js";
import type { ParsedFile } from "./parseFile.js";
import type { RewrittenNode } from "./rewriteNode.js";
import { rewriteScript } from "./rewriteScript.js";

export interface RewrittenFile {
  sourceFile: ts.SourceFile;
  scripts: Map<ts.TaggedTemplateExpression, RewrittenNode>;
}

export function rewriteFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): RewrittenFile {
  const sourceFile = parsedFile.sourceFile;

  const scripts = new Map<ts.TaggedTemplateExpression, RewrittenNode>();
  for (const script of flattenScripts(parsedFile.scripts)) {
    scripts.set(script.sourceNode, rewriteScript(ts, script));
  }

  return { sourceFile, scripts };
}
