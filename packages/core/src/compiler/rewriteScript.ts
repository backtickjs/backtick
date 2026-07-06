import type ts from "typescript";
import { DiagnosticCategory } from "typescript";
import type { SourceLocation, SourceRange } from "../cs-runtime/index.js";
import type { Diagnostic } from "./diagnostics.js";
import { arrow, call, constDecl, iife, sourceLoc } from "./nodeFactory.js";
import type { ClientScript, Splice } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { type RewriteState, rewriteNode } from "./rewriteNode.js";

export interface RewrittenScript {
  virtual: ts.Node;
  runtime: ts.Node;
  sourceMaps: Map<ts.Node, SourceRange>; // virtual -> source range
  diagnostics: Diagnostic[];
}

export function rewriteScript(
  ts: typeof import("typescript"),
  clientScript: ClientScript,
  bindings: BindingResolution,
  captures: string[] = [],
  declarations: string[] = [],
): RewrittenScript {
  const { sourceFile, sourceNode, fileWithPlaceholders } = clientScript;

  const state: RewriteState = {
    script: clientScript,
    bindings,
    errors: new Map(),
    mappings: new Map(),
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
      diagnostics: [],
    };
  }

  const rewritten = rewriteNode(ts, state, scriptNode);

  const sourceMaps: Map<ts.Node, SourceRange> = new Map();
  for (const [source, virtual] of state.mappings) {
    const range = clientScript.toSourceRange(source);
    sourceMaps.set(virtual, range);
  }

  const diagnostics: Diagnostic[] = [];
  for (const [node, message] of state.errors) {
    const range = clientScript.toSourceRange(node);
    diagnostics.push({
      range,
      message,
      category: DiagnosticCategory.Error,
      code: 0,
    });
  }

  const splices = Object.values(clientScript.splices);

  const metadata = ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        "splices",
        ts.factory.createArrayLiteralExpression(
          splices.map((splice: Splice) =>
            ts.factory.createIdentifier(splice.placeholder),
          ),
          false,
        ),
      ),
      ts.factory.createPropertyAssignment(
        "captures",
        ts.factory.createArrayLiteralExpression(
          captures.map((name) => ts.factory.createStringLiteral(name)),
          false,
        ),
      ),
      ts.factory.createPropertyAssignment(
        "declarations",
        ts.factory.createArrayLiteralExpression(
          declarations.map((name) => ts.factory.createStringLiteral(name)),
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

  const scriptRange: SourceRange = {
    start: sourceNode.getStart(sourceFile),
    end: sourceNode.getEnd(),
  };

  sourceMaps.set(virtual, scriptRange);

  const scriptLocation: SourceLocation = {
    path: sourceFile.fileName,
    start: sourceFile.getLineAndCharacterOfPosition(scriptRange.start),
    end: sourceFile.getLineAndCharacterOfPosition(scriptRange.end),
  };

  const spliceDecls = splices.map((splice: Splice) =>
    constDecl(ts, splice.placeholder, splice.sourceNode.expression),
  );

  const create = call(ts, "cs", "create", [
    sourceLoc(ts, scriptLocation),
    metadata,
    arrow(ts, ["v"], rewritten.runtime as ts.Expression),
  ]);

  const runtime = iife(
    ts,
    ts.factory.createBlock(
      [...spliceDecls, ts.factory.createReturnStatement(create)],
      true,
    ),
  );

  return { virtual, runtime, sourceMaps, diagnostics };
}
