import type ts from "typescript";
import type { ClientScript, ParsedFile } from "./parseFile.js";
import type { RewrittenNode } from "./rewriteNode.js";
import { rewriteScript } from "./rewriteScript.js";

export interface RewrittenFile {
  virtual: ts.SourceFile;
  runtime: ts.SourceFile;
}

export function rewriteFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): RewrittenFile {
  const { sourceFile, scripts } = parsedFile;

  // Rewrite every client script — including those nested inside splices —
  // mapping each tagged template to the virtual and runtime expressions that
  // take its place. Scripts we can't rewrite are left unmapped, so `transform`
  // descends into them and can still rewrite anything nested within.
  const mappings = new Map<ts.Node, RewrittenNode>();
  for (const script of eachScript(scripts)) {
    mappings.set(script.node, rewriteScript(ts, sourceFile, script));
  }

  // Substitute the rewrites back into the file: once for the virtual tree the
  // language service type-checks, once for the runtime tree.
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

/**
 * Rebuilds `sourceFile`, replacing every mapped node with the `kind` side of
 * its rewrite. A node mapped to itself (a script we couldn't rewrite) is kept
 * but still descended into, so nested scripts within it are rewritten.
 */
function transform(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  mappings: Map<ts.Node, RewrittenNode>,
  kind: keyof RewrittenNode,
): ts.SourceFile {
  const transformer =
    (context: ts.TransformationContext) => (root: ts.SourceFile) => {
      const visit = (node: ts.Node): ts.Node => {
        const replacement = mappings.get(node)?.[kind];
        if (replacement && replacement !== node) {
          return replacement;
        }
        return ts.visitEachChild(node, visit, context);
      };
      return ts.visitNode(root, visit) as ts.SourceFile;
    };

  return ts.transform(sourceFile, [transformer]).transformed[0];
}
