import type ts from "typescript";
import {
  type CompiledNode,
  type CompilerState,
  compileScriptNode,
} from "./compileScriptNode.js";
import { freeVars } from "./freeVars.js";
import { arrow, call, constDecl, iife, sourceLoc } from "./nodeFactory.js";
import type { ClientScript, Splice } from "./parseFile.js";

export function compileScript(
  ts: typeof import("typescript"),
  clientScript: ClientScript,
): CompiledNode {
  const unchanged = {
    virtual: clientScript.sourceNode,
    runtime: clientScript.sourceNode,
  };

  const { fileWithPlaceholders, toSourceLocation } = clientScript;

  const state: CompilerState = {
    script: clientScript,
    origins: new Map(),
    errors: new Map(),
  };

  const [statement] = fileWithPlaceholders.statements;
  let scriptNode: ts.Expression | ts.Block;
  if (statement && ts.isExpressionStatement(statement)) {
    scriptNode = statement.expression;
  } else if (statement && ts.isBlock(statement)) {
    scriptNode = statement;
  } else {
    return unchanged;
  }

  const compiled = compileScriptNode(ts, state, scriptNode);

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
    ts.isBlock(compiled.virtual)
      ? iife(ts, compiled.virtual)
      : (compiled.virtual as ts.Expression),
  ]);

  const spliceDecls = splices.map((splice: Splice) =>
    constDecl(ts, splice.placeholder, splice.sourceNode.expression),
  );

  const create = call(ts, "cs", "create", [
    arrow(
      ts,
      ["v"],
      call(ts, "v", "backtick", [
        sourceLoc(ts, toSourceLocation(scriptNode)),
        metadata,
        compiled.runtime as ts.Expression,
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

  return { virtual, runtime };
}
