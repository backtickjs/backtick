import type ts from "typescript";
import type { ClientScript, Splice } from "./parseFile.js";
import {
  type CompilerState,
  type CompiledNode,
  compileNode,
} from "./compileNode.js";
import { scriptKindFor } from "./scriptKindFor.js";

export function compileScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  clientScript: ClientScript,
): CompiledNode {
  const scriptWithPlaceholders = ts.createSourceFile(
    sourceFile.fileName,
    clientScript.textWithPlaceholders,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(ts, sourceFile.fileName),
  );

  const state: CompilerState = {
    splices: clientScript.splices,
    mappings: new Map(),
    errors: new Map(),
    declaredVars: new Set(),
    freeVars: new Set(),
  };

  const [statement] = scriptWithPlaceholders.statements;
  let bodyNode: ts.Expression | ts.Block | undefined;
  if (statement && ts.isExpressionStatement(statement)) {
    bodyNode = statement.expression;
  } else if (statement && ts.isBlock(statement)) {
    // `{a: 4}` parses as a block wrapping a labeled statement, but the author
    // means an object literal. Re-parse the text as a parenthesized expression;
    // if that yields a clean object literal, prefer it over the block reading.
    bodyNode =
      tryParseObjectLiteral(
        ts,
        sourceFile.fileName,
        clientScript.textWithPlaceholders,
      ) ?? statement;
  }

  if (bodyNode) {
    const body = compileNode(ts, state, bodyNode);
    if (state.errors.size === 0) {
      return {
        virtual: liftVirtual(ts, body.virtual),
        runtime: createRuntime(ts, clientScript, state, body.runtime),
      };
    }
  }

  return { virtual: clientScript.node, runtime: clientScript.node };
}

/**
 * Re-parse a script body as `(<text>)` to tell an object literal apart from a
 * block. Both produce an object literal under TypeScript's error recovery, so
 * the parse diagnostics are what distinguish a genuine object (no diagnostics)
 * from a block forced into one (e.g. `{ const x = 0; }`).
 */
function tryParseObjectLiteral(
  ts: typeof import("typescript"),
  fileName: string,
  text: string,
): ts.ObjectLiteralExpression | undefined {
  const wrapped = ts.createSourceFile(
    fileName,
    `(${text})`,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(ts, fileName),
  );

  const { parseDiagnostics } = wrapped as ts.SourceFile & {
    parseDiagnostics?: ts.Diagnostic[];
  };
  if (parseDiagnostics && parseDiagnostics.length > 0) {
    return undefined;
  }

  const [statement] = wrapped.statements;
  if (
    statement &&
    ts.isExpressionStatement(statement) &&
    ts.isParenthesizedExpression(statement.expression) &&
    ts.isObjectLiteralExpression(statement.expression.expression)
  ) {
    return statement.expression.expression;
  }

  return undefined;
}

function createRuntime(
  ts: typeof import("typescript"),
  clientScript: ClientScript,
  state: CompilerState,
  runtime: ts.Node,
): ts.Expression {
  const { factory } = ts;
  const splices = Object.values(clientScript.splices);

  // const $0splice0 = <expression>; — one binding per splice, in source order.
  const bindings = splices.map((splice: Splice) =>
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            splice.placeholder,
            undefined,
            undefined,
            splice.node.expression,
          ),
        ],
        ts.NodeFlags.Const,
      ),
    ),
  );

  // { splices: { $0splice0: $0splice0, ... }, freeVars: [] }
  const metadata = factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        "splices",
        factory.createObjectLiteralExpression(
          splices.map((splice: Splice) =>
            factory.createPropertyAssignment(
              splice.placeholder,
              factory.createIdentifier(splice.placeholder),
            ),
          ),
          false,
        ),
      ),
      factory.createPropertyAssignment(
        "freeVars",
        factory.createArrayLiteralExpression(
          [...state.freeVars].map((name) => factory.createStringLiteral(name)),
          false,
        ),
      ),
    ],
    false,
  );

  // v => v.backtick(null, metadata, <runtime body>)
  const visit = factory.createArrowFunction(
    undefined,
    undefined,
    [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        "v",
        undefined,
        undefined,
        undefined,
      ),
    ],
    undefined,
    undefined,
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("v"),
        "backtick",
      ),
      undefined,
      [factory.createNull(), metadata, runtime as ts.Expression],
    ),
  );

  const createCall = factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("cs"),
      "create",
    ),
    undefined,
    [visit],
  );

  const iife = factory.createArrowFunction(
    undefined,
    undefined,
    [],
    undefined,
    undefined,
    factory.createBlock(
      [...bindings, factory.createReturnStatement(createCall)],
      true,
    ),
  );

  return factory.createCallExpression(
    factory.createParenthesizedExpression(iife),
    undefined,
    [],
  );
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
        virtual as ts.ConciseBody,
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
