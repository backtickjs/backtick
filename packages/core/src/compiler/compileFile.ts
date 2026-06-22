import type ts from "typescript";
import type { ClientScript, ParsedFile } from "./parseFile.js";
import type { CompiledNode } from "./compileNode.js";
import { compileScript } from "./compileScript.js";

export interface CompiledFile {
  virtual: ts.SourceFile;
  runtime: ts.SourceFile;
}

export function compileFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): CompiledFile {
  const { sourceFile, scripts } = parsedFile;

  const mappings = new Map<ts.Node, CompiledNode>();
  for (const script of eachScript(scripts)) {
    mappings.set(script.node, compileScript(ts, sourceFile, script));
  }

  return {
    virtual: transform(ts, sourceFile, mappings, "virtual"),
    runtime: transform(ts, sourceFile, mappings, "runtime"),
  };
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

function transform(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  mappings: Map<ts.Node, CompiledNode>,
  kind: keyof CompiledNode,
): ts.SourceFile {
  const transformer =
    (context: ts.TransformationContext) => (root: ts.SourceFile) => {
      const visit = (node: ts.Node): ts.Node => {
        const replacement = mappings.get(node)?.[kind];
        if (replacement && replacement !== node) {
          return ts.visitEachChild(replacement, visit, context);
        }
        return ts.visitEachChild(node, visit, context);
      };
      return ts.visitNode(root, visit) as ts.SourceFile;
    };

  return ts.transform(sourceFile, [transformer]).transformed[0];
}
