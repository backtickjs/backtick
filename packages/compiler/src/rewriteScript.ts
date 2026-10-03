import type ts from "typescript";
import type { CompiledScript } from "./compileScript.js";
import type { Diagnostic } from "./diagnostics.js";
import {
  type EmittedScript,
  emitScript,
  paramName,
  scriptEdits,
} from "./emitScript.js";
import { call } from "./nodeFactory.js";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution, ResolvedParam } from "./resolveBindings.js";
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
  // what the client runs (null where the script did not parse, which is left
  // as written)
  runtime: RuntimeScript | null;
  // whether its splices `await`, so the wrapper it is checked in does too
  awaits: boolean;
  // left as written: checked as nothing, its errors already said
  leftAsWritten: boolean;
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

  // A script that can't be rewritten is left as written at runtime, and
  // checked as nothing, so nothing else is reported for it.
  const leftAsWritten = (diagnostics: Diagnostic[]): RewrittenScript => ({
    runtime: null,
    awaits: false,
    leftAsWritten: true,
    diagnostics,
  });

  const [statement] = fileWithPlaceholders.statements;
  if (
    !statement ||
    !(ts.isExpressionStatement(statement) || ts.isBlock(statement))
  ) {
    return leftAsWritten([]);
  }

  // A `${…}` written where the script has text rather than code is no splice.
  const unspliced = unsplicedSpans(ts, clientScript);
  if (unspliced.length > 0) {
    return leftAsWritten(unspliced);
  }

  const diagnostics = refusals(ts, clientScript);

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

  // A splice that awaits is the host's `await`, where the template is: where
  // the host may await, the script's function is async, and awaited there;
  // elsewhere it isn't, so the splice's own `await` is refused where written.
  const awaits =
    mayAwait(ts, sourceNode) &&
    Object.values(clientScript.splices).some(
      (splice) => splice.kind === "braced" && hasAwait(ts, splice.expression),
    );

  const emitted = emitScript(
    ts,
    clientScript,
    params.map(paramName),
    scriptEdits(clientScript, bindings, params),
  );

  return {
    runtime: { id, metadata, emitted },
    awaits,
    leftAsWritten: false,
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

// What a script may not write though TypeScript would read it: a name it
// declares where it can't, and a splice it can't spell unbraced.
function refusals(
  ts: typeof import("typescript"),
  script: ClientScript,
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const refuse = (node: ts.Node, message: string): void => {
    diagnostics.push({
      range: script.toSourceRange(node),
      message,
      category: ts.DiagnosticCategory.Error,
      code: 0,
    });
  };
  const visit = (node: ts.Node): void => {
    const name =
      (ts.isVariableDeclaration(node) ||
        ts.isBindingElement(node) ||
        ts.isParameter(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node)) &&
      node.name !== undefined &&
      ts.isIdentifier(node.name)
        ? node.name
        : undefined;
    if (name !== undefined) {
      // `$`-prefixed names splice host bindings, so a client script can't
      // declare one: the declaration would shadow the shorthand.
      if (name.text.startsWith("$")) {
        refuse(
          name,
          "`$`-prefixed names are reserved for unbraced splices in a `cs` " +
            "client script.",
        );
      } else {
        // Checked here rather than left to TypeScript: the virtual code binds
        // renamed names, so its strict-mode checks never see these, and
        // without strict mode it wouldn't check them at all.
        const reason = strictReason(name.text);
        if (reason !== null) {
          refuse(
            name,
            `\`${name.text}\` is not allowed as a ${
              ts.isParameter(node) ? "parameter" : "variable declaration"
            } name: ${reason}.`,
          );
        }
      }
    }
    node.forEachChild(visit);
  };
  visit(script.fileWithPlaceholders);
  // A `$`-prefixed host binding has no shorthand: `$$x` stacks sigils
  // unreadably, so it splices braced.
  for (const splice of Object.values(script.splices)) {
    if (splice.kind === "unbraced" && splice.expression.text.startsWith("$")) {
      for (const ref of splice.refs) {
        refuse(
          ref,
          `Can't splice \`${splice.expression.text}\` unbraced: a ` +
            "`$`-prefixed host binding splices with braces, e.g. " +
            `\`\${${splice.expression.text}}\`.`,
        );
      }
    }
  }
  return diagnostics;
}

// Why strict mode forbids binding a name, or null where it doesn't.
function strictReason(name: string): string | null {
  switch (name) {
    case "eval":
    case "arguments":
      return "strict mode forbids binding it";
    case "let":
    case "static":
    case "yield":
    case "implements":
    case "interface":
    case "package":
    case "private":
    case "protected":
    case "public":
      return "it is reserved in strict mode";
    case "await":
      return "it is reserved in module code";
    default:
      return null;
  }
}
