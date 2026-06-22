import type ts from "typescript";
import type { ClientScript, Splice } from "./parseFile.js";
import {
  type CompilerState,
  type CompiledNode,
  compileScriptNode,
} from "./compileScriptNode.js";
import { scriptKindFor } from "./scriptKindFor.js";
import { arrow, call, constDecl, iife } from "./nodeFactory.js";

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

  const compiled = compileScriptNode(ts, state, node);

  const virtual = ts.isBlock(compiled.virtual)
    ? iife(ts, compiled.virtual)
    : (compiled.virtual as ts.Expression);

  const splices = Object.values(clientScript.splices);

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
          [...state.freeVars].map((name) =>
            ts.factory.createStringLiteral(name),
          ),
          false,
        ),
      ),
    ],
    false,
  );

  const visit = arrow(
    ts,
    ["v"],
    call(ts, "v", "backtick", [
      ts.factory.createNull(),
      metadata,
      compiled.runtime as ts.Expression,
    ]),
  );

  return {
    virtual: call(ts, "cs", "lift", [virtual]),
    runtime: iife(
      ts,
      ts.factory.createBlock(
        [
          ...splices.map((splice: Splice) =>
            constDecl(ts, splice.placeholder, splice.node.expression),
          ),
          ts.factory.createReturnStatement(call(ts, "cs", "create", [visit])),
        ],
        true,
      ),
    ),
  };
}
