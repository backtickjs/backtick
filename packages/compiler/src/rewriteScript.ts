import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import type { Diagnostic } from "./diagnostics.js";
import { type EmittedScript, emitScript, scriptEdits } from "./emitScript.js";
import { call, iife } from "./nodeFactory.js";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution, ResolvedParam } from "./resolveBindings.js";
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
  params: readonly ResolvedParam[] = [],
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
  // Which script this is (see `ClientScript.id`): its line from 1, and its
  // column from 0.
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(
    scriptRange.start,
  );
  const id = `${fileHash}:${line + 1}:${character}`;

  // The script's parameters, as `Metadata` describes them: a splice is the
  // host expression written there, and a host tag the host binding it names.
  const objectLiteral = (properties: Record<string, ts.Expression>) =>
    ts.factory.createObjectLiteralExpression(
      Object.entries(properties).map(([name, value]) =>
        ts.factory.createPropertyAssignment(name, value),
      ),
      false,
    );
  const string = (text: string) => ts.factory.createStringLiteral(text);
  const metadata = objectLiteral({
    params: ts.factory.createArrayLiteralExpression(
      params.map((param) => {
        switch (param.kind) {
          case "splice":
            return objectLiteral({
              kind: string("splice"),
              value: clientScript.splices[param.key]!.expression,
              bindings: ts.factory.createArrayLiteralExpression(
                param.bindings.map(string),
                false,
              ),
            });
          case "tag":
            return objectLiteral({
              kind: string("tag"),
              value: ts.factory.createIdentifier(param.key),
            });
          case "capture":
            return objectLiteral({
              kind: string("capture"),
              key: string(param.key),
            });
        }
      }),
      false,
    ),
  });

  const virtual = call(ts, "cs", "lift", [
    ts.isBlock(rewritten.virtual)
      ? iife(ts, rewritten.virtual)
      : (rewritten.virtual as ts.Expression),
  ]);

  sourceMaps.set(virtual, scriptRange);

  const emitted = emitScript(
    ts,
    clientScript,
    params.length,
    scriptEdits(clientScript, bindings, params),
  );

  const runtime = call(ts, "cs", "create", [
    ts.factory.createStringLiteral(id),
    metadata,
    string(emitted.code),
    string(emitted.map),
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
