import type ts from "typescript";
import { compileScript } from "./compileScript.js";
import type { CompiledNode } from "./compileScriptNode.js";
import { flattenScripts } from "./flattenScripts.js";
import type { ParsedFile } from "./parseFile.js";

export interface CompiledFile {
  scripts: Map<ts.TaggedTemplateExpression, CompiledNode>;
}

export function compileFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): CompiledFile {
  const scripts = new Map<ts.TaggedTemplateExpression, CompiledNode>();
  for (const script of flattenScripts(parsedFile.scripts)) {
    scripts.set(script.sourceNode, compileScript(ts, script));
  }

  return { scripts };
}
