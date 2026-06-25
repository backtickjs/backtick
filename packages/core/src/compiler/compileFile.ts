import type ts from "typescript";
import { compileScript } from "./compileScript.js";
import type { CompiledNode } from "./compileScriptNode.js";
import type { ClientScript, ParsedFile } from "./parseFile.js";

export interface CompiledFile {
  scripts: Map<ts.TaggedTemplateExpression, CompiledNode>;
}

export function compileFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): CompiledFile {
  const scripts = new Map<ts.TaggedTemplateExpression, CompiledNode>();
  for (const script of eachScript(parsedFile.scripts)) {
    scripts.set(script.sourceNode, compileScript(ts, script));
  }

  return { scripts };
}

/** Yields every client script in the tree, descending through splices. */
function* eachScript(scripts: {
  [start: number]: ClientScript;
}): Generator<ClientScript> {
  for (const script of Object.values(scripts)) {
    yield script;
    for (const splice of Object.values(script.splices)) {
      yield* eachScript(splice.scripts);
    }
  }
}
