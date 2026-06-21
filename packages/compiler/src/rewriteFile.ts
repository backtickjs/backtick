import type ts from "typescript";
import type { ClientScript, ParsedFile } from "./parseFile.js";
import {
  type RewriteState,
  type RewrittenNode,
  rewriteNode,
} from "./rewriteNode.js";
import { scriptKindFor } from "./scriptKindFor.js";

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

function rewriteScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  clientScript: ClientScript,
): RewrittenNode {
  const scriptWithPlaceholders = ts.createSourceFile(
    sourceFile.fileName,
    clientScript.textWithPlaceholders,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(ts, sourceFile.fileName),
  );

  const state: RewriteState = {
    splices: clientScript.splices,
    mappings: new Map(),
    errors: new Map(),
  };

  const [statement] = scriptWithPlaceholders.statements;
  if (statement && ts.isExpressionStatement(statement)) {
    const body = rewriteNode(ts, state, statement.expression);
    if (state.errors.size === 0) {
      return { virtual: liftVirtual(ts, body.virtual), runtime: body.runtime };
    }
  }

  // Nothing we could rewrite — map the script to itself so the transform leaves
  // the `cs`...`` in place but still descends into any nested scripts.
  return { virtual: clientScript.node, runtime: clientScript.node };
}

/**
 * Wraps a script's virtual expression in `cs.lift((() => ...)())`, lifting the
 * client value into the type system at the point the script is used.
 */
function liftVirtual(
  ts: typeof import("typescript"),
  virtual: ts.Node,
): ts.Expression {
  const iife = ts.factory.createCallExpression(
    ts.factory.createParenthesizedExpression(
      ts.factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        undefined,
        virtual as ts.Expression,
      ),
    ),
    undefined,
    [],
  );

  return ts.factory.createCallExpression(
    ts.factory.createPropertyAccessExpression(
      ts.factory.createIdentifier("cs"),
      "lift",
    ),
    undefined,
    [iife],
  );
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
