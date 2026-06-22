import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";
import {
  type RewriteState,
  type RewrittenNode,
  rewriteNode,
} from "./rewriteNode.js";
import { scriptKindFor } from "./scriptKindFor.js";

export function rewriteScript(
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
