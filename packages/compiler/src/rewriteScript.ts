import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import type { Diagnostic } from "./diagnostics.js";
import { type EmittedScript, emitScript, scriptEdits } from "./emitScript.js";
import { arrow, call, iife, object } from "./nodeFactory.js";
import { type ClientScript, sourceLocation } from "./parseFile.js";
import type { BindingResolution, ResolvedSplice } from "./resolveBindings.js";
import { type RewriteState, rewriteNode } from "./rewriteNode.js";
import type { SourceRange } from "./SourceRange.js";

export interface RewrittenScript {
  virtual: ts.Node;
  runtime: ts.Node;
  // what the client runs, as `runtime` carries it (null where the script did
  // not parse)
  emitted: EmittedScript | null;
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
  splices: ReadonlyMap<string, ResolvedSplice> = new Map(),
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
      emitted: null,
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

  const scriptRange: SourceRange = {
    start: sourceNode.getStart(sourceFile),
    end: sourceNode.getEnd(),
  };
  const scriptLocation = sourceLocation(
    sourceFile,
    scriptRange.start,
    scriptRange.end,
  );

  const metadata = ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        "fileHash",
        ts.factory.createStringLiteral(fileHash),
      ),
      ts.factory.createPropertyAssignment(
        "splices",
        ts.factory.createObjectLiteralExpression(
          // A splice the text spells is the host expression written there, and
          // a host tag the host binding it names.
          Array.from(splices, ([key, splice]) =>
            ts.factory.createPropertyAssignment(
              key,
              ts.factory.createObjectLiteralExpression(
                [
                  ts.factory.createPropertyAssignment(
                    "value",
                    clientScript.splices[key]?.expression ??
                      ts.factory.createIdentifier(key.slice(1)),
                  ),
                  ts.factory.createPropertyAssignment(
                    "params",
                    ts.factory.createArrayLiteralExpression(
                      splice.params.map((name) =>
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
      : (rewritten.virtual as ts.Expression),
  ]);

  sourceMaps.set(virtual, scriptRange);

  const emitted = emitScript(
    ts,
    clientScript,
    splices.size + captures.length,
    scriptEdits(clientScript, bindings, splices, captures),
  );

  const runtime = call(ts, "cs", "create", [
    object(ts, scriptLocation),
    metadata,
    // The body behind a thunk: one `cs` inside a host function makes a script
    // per call, and the bundler reads one per source location, so the nodes
    // are built when they are first read rather than at every call.
    arrow(ts, [], object(ts, rewritten.runtime)),
    ts.factory.createStringLiteral(emitted.code),
    ts.factory.createStringLiteral(emitted.map),
  ]);

  return {
    virtual,
    runtime,
    emitted,
    sourceMaps,
    codeInformation: state.codeInformation,
    diagnostics,
  };
}
