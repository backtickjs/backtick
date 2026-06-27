import type ts from "typescript";
import type { SourceLocation, SourceRange } from "../cs-runtime/index.js";
import { freeVars } from "./freeVars.js";
import { arrow, call, constDecl, iife, sourceLoc } from "./nodeFactory.js";
import type { ClientScript, Splice } from "./parseFile.js";
import { type RewriteState, rewriteNode } from "./rewriteNode.js";

export interface RewrittenScript {
  virtual: ts.Node;
  runtime: ts.Node;
  sourceMaps: Map<ts.Identifier, SourceRange>; // virtual -> source range
}

export function rewriteScript(
  ts: typeof import("typescript"),
  clientScript: ClientScript,
): RewrittenScript {
  const { sourceFile, sourceNode, fileWithPlaceholders } = clientScript;

  const state: RewriteState = {
    script: clientScript,
    errors: new Map(),
    sourceMaps: new Map(),
  };

  const [statement] = fileWithPlaceholders.statements;
  let scriptNode: ts.Expression | ts.Block;
  if (statement && ts.isExpressionStatement(statement)) {
    scriptNode = statement.expression;
  } else if (statement && ts.isBlock(statement)) {
    scriptNode = statement;
  } else {
    return {
      virtual: sourceNode,
      runtime: sourceNode,
      sourceMaps: new Map(),
    };
  }

  const rewritten = rewriteNode(ts, state, scriptNode);

  const splices = Object.values(clientScript.splices);

  const freeVariables = freeVars(ts, clientScript.splices, scriptNode);

  const metadata = ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        "splices",
        ts.factory.createObjectLiteralExpression(
          splices.map((splice: Splice) =>
            ts.factory.createPropertyAssignment(
              splice.placeholder,
              ts.factory.createIdentifier(splice.placeholder),
            ),
          ),
          false,
        ),
      ),
      ts.factory.createPropertyAssignment(
        "freeVars",
        ts.factory.createArrayLiteralExpression(
          freeVariables.map((name) => ts.factory.createStringLiteral(name)),
          false,
        ),
      ),
    ],
    false,
  );

  const virtual = call(ts, "cs", "lift", [
    ts.isBlock(rewritten.virtual)
      ? iife(ts, rewritten.virtual)
      : (rewritten.virtual as ts.Expression),
  ]);

  const spliceDecls = splices.map((splice: Splice) =>
    constDecl(ts, splice.placeholder, splice.sourceNode.expression),
  );

  const scriptLocation: SourceLocation = {
    path: sourceFile.fileName,
    start: sourceFile.getLineAndCharacterOfPosition(
      sourceNode.getStart(sourceFile),
    ),
    end: sourceFile.getLineAndCharacterOfPosition(sourceNode.getEnd()),
  };

  const create = call(ts, "cs", "create", [
    arrow(
      ts,
      ["v"],
      call(ts, "v", "clientScript", [
        sourceLoc(ts, scriptLocation),
        metadata,
        rewritten.runtime as ts.Expression,
      ]),
    ),
  ]);

  const runtime = iife(
    ts,
    ts.factory.createBlock(
      [...spliceDecls, ts.factory.createReturnStatement(create)],
      true,
    ),
  );

  return { virtual, runtime, sourceMaps: state.sourceMaps };
}
