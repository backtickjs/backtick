import { type SourceLocation, version } from "@backtickjs/boundary";
import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import type { Diagnostic } from "./diagnostics.js";
import { arrow, call, iife, sourceLoc } from "./nodeFactory.js";
import type { ClientScript, Splice } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { bodyKind } from "./bodyKind.js";
import { type RewriteState, rewriteNode } from "./rewriteNode.js";
import type { SourceRange } from "./SourceRange.js";

export interface RewrittenScript {
  virtual: ts.Node;
  runtime: ts.Node;
  sourceMaps: Map<ts.Node, SourceRange>; // virtual -> source range
  // virtual nodes whose mappings carry non-default editor behavior
  codeInformation: Map<ts.Node, CodeInformation>;
  diagnostics: Diagnostic[];
}

export function rewriteScript(
  ts: typeof import("typescript"),
  clientScript: ClientScript,
  fileHash: string,
  bindings: BindingResolution,
  captures: string[] = [],
  spliceParams: { [splice: string]: string[] } = {},
): RewrittenScript {
  const { sourceFile, sourceNode, fileWithPlaceholders } = clientScript;

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
      codeInformation: new Map(),
      diagnostics: [],
    };
  }

  const state: RewriteState = {
    script: clientScript,
    bindings,
    errors: new Map(),
    mappings: new Map(),
    codeInformation: new Map(),
    captures: new Set(captures),
    bodyKind: bodyKind(ts, scriptNode),
  };

  const rewritten = rewriteNode(ts, state, scriptNode);

  const sourceMaps: Map<ts.Node, SourceRange> = new Map();
  for (const [virtual, source] of state.mappings) {
    sourceMaps.set(virtual, clientScript.toSourceRange(source));
  }

  const diagnostics: Diagnostic[] = [];
  for (const [node, message] of state.errors) {
    const range = clientScript.toSourceRange(node);
    diagnostics.push({
      range,
      message,
      category: ts.DiagnosticCategory.Error,
      code: 0,
    });
  }

  const splices = Object.values(clientScript.splices);

  const scriptRange: SourceRange = {
    start: sourceNode.getStart(sourceFile),
    end: sourceNode.getEnd(),
  };
  const from = sourceFile.getLineAndCharacterOfPosition(scriptRange.start);
  const to = sourceFile.getLineAndCharacterOfPosition(scriptRange.end);
  const scriptLocation: SourceLocation = [
    from.line,
    from.character,
    to.line,
    to.character,
  ];

  const metadata = ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        "version",
        ts.factory.createStringLiteral(version),
      ),
      ts.factory.createPropertyAssignment(
        "filePath",
        ts.factory.createStringLiteral(sourceFile.fileName),
      ),
      ts.factory.createPropertyAssignment(
        "fileHash",
        ts.factory.createStringLiteral(fileHash),
      ),
      ts.factory.createPropertyAssignment(
        "splices",
        ts.factory.createObjectLiteralExpression(
          splices.map((splice: Splice) =>
            ts.factory.createPropertyAssignment(
              splice.key,
              ts.factory.createObjectLiteralExpression(
                [
                  ts.factory.createPropertyAssignment(
                    "value",
                    splice.expression,
                  ),
                  ts.factory.createPropertyAssignment(
                    "params",
                    ts.factory.createArrayLiteralExpression(
                      (spliceParams[splice.key] ?? []).map((name) =>
                        ts.factory.createStringLiteral(name),
                      ),
                      false,
                    ),
                  ),
                ],
                false,
              ),
            ),
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
    ],
    false,
  );

  const virtual = call(ts, "cs", "lift", [
    ts.isBlock(rewritten.virtual)
      ? iife(ts, rewritten.virtual)
      : call(ts, "cs", "const", [rewritten.virtual as ts.Expression]),
  ]);

  sourceMaps.set(virtual, scriptRange);

  const runtime = call(ts, "cs", "create", [
    sourceLoc(ts, scriptLocation),
    metadata,
    // The body behind a thunk: one `cs` inside a host function makes a script
    // per call, and the bundler parses one per source location, so the nodes
    // are built when they are first read rather than at every call.
    arrow(ts, [], rewritten.runtime as ts.Expression),
  ]);

  return {
    virtual,
    runtime,
    sourceMaps,
    codeInformation: state.codeInformation,
    diagnostics,
  };
}
