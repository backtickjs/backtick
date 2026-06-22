import type ts from "typescript";
import type { ClientScript, Splice } from "./parseFile.js";
import {
  type CompilerState,
  type CompiledNode,
  compileNode,
} from "./compileNode.js";
import { scriptKindFor } from "./scriptKindFor.js";
import { call, iife } from "./nodeFactory.js";

export function compileScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  clientScript: ClientScript,
): CompiledNode {
  const unchanged = {
    virtual: clientScript.node,
    runtime: clientScript.node,
  };

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
  let node: ts.Expression | ts.Block;
  if (statement && ts.isExpressionStatement(statement)) {
    node = statement.expression;
  } else if (statement && ts.isBlock(statement)) {
    node = statement;
  } else {
    return unchanged;
  }

  const compiled = compileNode(ts, state, node);

  const virtual = ts.isBlock(compiled.virtual)
    ? iife(ts, compiled.virtual)
    : (compiled.virtual as ts.Expression);

  return {
    virtual: call(ts, "cs", "lift", [virtual]),
    runtime: createRuntime(ts, clientScript, state, compiled.runtime),
  };
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
    call(ts, "v", "backtick", [
      factory.createNull(),
      metadata,
      runtime as ts.Expression,
    ]),
  );

  const createCall = call(ts, "cs", "create", [visit]);

  return iife(
    ts,
    factory.createBlock(
      [...bindings, factory.createReturnStatement(createCall)],
      true,
    ),
  );
}
