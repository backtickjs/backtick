import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import type { CompiledScript } from "./compileScript.js";
import type { Diagnostic } from "./diagnostics.js";
import {
  type EmittedScript,
  emitScript,
  paramName,
  scriptEdits,
} from "./emitScript.js";
import { call, iife } from "./nodeFactory.js";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution, ResolvedParam } from "./resolveBindings.js";
import { type RewriteState, rewriteNode } from "./rewriteNode.js";
import type { SourceRange } from "./SourceRange.js";

/** What `cs.create` is handed for a script: which it is, and what it runs. */
export interface RuntimeScript {
  id: string;
  metadata: ts.Expression;
  emitted: EmittedScript;
}

/** A script as the client gets it, `cs.create(id, metadata, code, map, dependencies)`. */
export function createCall(
  ts: typeof import("typescript"),
  { id, metadata }: RuntimeScript,
  { code, map, dependencies }: CompiledScript,
): ts.Expression {
  const string = (text: string) => ts.factory.createStringLiteral(text);
  return call(ts, "cs", "create", [
    string(id),
    metadata,
    string(code),
    string(map),
    ts.factory.createArrayLiteralExpression(dependencies.map(string)),
  ]);
}

export interface RewrittenScript {
  virtual: ts.Node;
  // what the client runs (null where the script did not parse, which is left
  // as written)
  runtime: RuntimeScript | null;
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

  // A script that can't be rewritten is left as written at runtime. Its
  // virtual code is built rather than the source node, which is printed
  // against the template's text and would read as something else; `never`
  // fits wherever the script stands, so nothing else is reported for it.
  const leftAsWritten = (diagnostics: Diagnostic[]): RewrittenScript => ({
    virtual: call(ts, "cs", "lift", [
      ts.factory.createAsExpression(
        ts.factory.createIdentifier("undefined"),
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
      ),
    ]),
    runtime: null,
    sourceMaps: new Map(),
    codeInformation: new Map(),
    diagnostics,
  });

  const [statement] = fileWithPlaceholders.statements;
  let scriptNode: ts.Expression | ts.Block;
  if (statement && ts.isExpressionStatement(statement)) {
    scriptNode = statement.expression;
  } else if (statement && ts.isBlock(statement)) {
    scriptNode = statement;
  } else {
    return leftAsWritten([]);
  }

  // A `${…}` written where the script has text rather than code is no splice.
  const unspliced = unsplicedSpans(ts, clientScript);
  if (unspliced.length > 0) {
    return leftAsWritten(unspliced);
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

  const body = rewritten.virtual as ts.Block | ts.Expression;
  // A splice that awaits is the host's `await`, where the template is: where
  // the host may await, the script's function is async, and awaited there;
  // elsewhere it isn't, so the splice's own `await` is refused where written.
  const awaits =
    mayAwait(ts, sourceNode) &&
    Object.values(clientScript.splices).some(
      (splice) => splice.kind === "braced" && hasAwait(ts, splice.expression),
    );
  const run = iife(ts, [], body, awaits);
  const virtual = call(ts, "cs", "lift", [
    awaits ? ts.factory.createAwaitExpression(run) : run,
  ]);

  sourceMaps.set(virtual, scriptRange);

  const emitted = emitScript(
    ts,
    clientScript,
    params.map(paramName),
    scriptEdits(clientScript, bindings, params),
  );

  return {
    virtual,
    runtime: { id, metadata, emitted },
    sourceMaps,
    codeInformation: state.codeInformation,
    diagnostics,
  };
}

// Whether host code at `node` may `await`: in an async function, or at a
// module's top level.
function mayAwait(ts: typeof import("typescript"), node: ts.Node): boolean {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (ts.isFunctionLike(parent)) {
      return (
        ts
          .getModifiers(parent as ts.FunctionLikeDeclaration)
          ?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword) ??
        false
      );
    }
  }
  return true;
}

// An `await` in host code, but not one inside a function it holds, which is
// that function's own, nor in a nested script, which is checked as its own.
function hasAwait(ts: typeof import("typescript"), node: ts.Node): boolean {
  if (ts.isAwaitExpression(node)) {
    return true;
  }
  if (ts.isFunctionLike(node) || ts.isTaggedTemplateExpression(node)) {
    return false;
  }
  return ts.forEachChild(node, (child) => hasAwait(ts, child)) ?? false;
}

// Each `${…}` that isn't a splice: written in text (JSX text, a string, a
// comment) rather than code, where nothing reads its placeholder.
function unsplicedSpans(
  ts: typeof import("typescript"),
  { sourceFile, sourceNode, splices }: ClientScript,
): Diagnostic[] {
  const spans = ts.isTemplateExpression(sourceNode.template)
    ? sourceNode.template.templateSpans
    : [];
  return spans
    .filter((_, index) => splices[`$0splice${index}`] === undefined)
    .map((span) => ({
      range: {
        start: span.expression.getFullStart() - 2, // at `${`
        end: span.literal.getStart(sourceFile) + 1, // past `}`
      },
      message:
        "This `${…}` is in text, not code, so it isn't spliced. As an " +
        "element's child, write it in braces: `{${…}}`.",
      category: ts.DiagnosticCategory.Error,
      code: 0,
    }));
}
