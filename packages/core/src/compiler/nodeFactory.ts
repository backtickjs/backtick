import type ts from "typescript";
import type { SourceLocation } from "../cs-runtime/index.js";

/** <receiver>.<method>(...args) */
export function call(
  ts: typeof import("typescript"),
  receiver: string,
  method: string,
  args: ts.Expression[],
): ts.CallExpression {
  return ts.factory.createCallExpression(
    ts.factory.createPropertyAccessExpression(
      ts.factory.createIdentifier(receiver),
      method,
    ),
    undefined,
    args,
  );
}

/** (<params>) => <body> */
export function arrow(
  ts: typeof import("typescript"),
  params: string[],
  body: ts.ConciseBody,
): ts.ArrowFunction {
  return ts.factory.createArrowFunction(
    undefined,
    undefined,
    params.map((name) =>
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        name,
        undefined,
        undefined,
        undefined,
      ),
    ),
    undefined,
    undefined,
    body,
  );
}

/** (() => <body>)() */
export function iife(
  ts: typeof import("typescript"),
  body: ts.ConciseBody,
): ts.CallExpression {
  return ts.factory.createCallExpression(
    ts.factory.createParenthesizedExpression(arrow(ts, [], body)),
    undefined,
    [],
  );
}

/** <const|let|var> <name> = <initializer>; */
export function varDecl(
  ts: typeof import("typescript"),
  flags: ts.NodeFlags,
  name: string,
  initializer: ts.Expression,
): ts.VariableStatement {
  return ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          name,
          undefined,
          undefined,
          initializer,
        ),
      ],
      flags,
    ),
  );
}

/** const <name> = <initializer>; */
export function constDecl(
  ts: typeof import("typescript"),
  name: string,
  initializer: ts.Expression,
): ts.VariableStatement {
  return varDecl(ts, ts.NodeFlags.Const, name, initializer);
}

export function sourceLoc(
  ts: typeof import("typescript"),
  location: SourceLocation,
): ts.ObjectLiteralExpression {
  return ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        "path",
        ts.factory.createStringLiteral(location.path),
      ),
      ts.factory.createPropertyAssignment(
        "start",
        ts.factory.createObjectLiteralExpression(
          [
            ts.factory.createPropertyAssignment(
              "line",
              ts.factory.createNumericLiteral(location.start.line + 1),
            ),
            ts.factory.createPropertyAssignment(
              "character",
              ts.factory.createNumericLiteral(location.start.character + 1),
            ),
          ],
          false,
        ),
      ),
      ts.factory.createPropertyAssignment(
        "end",
        ts.factory.createObjectLiteralExpression(
          [
            ts.factory.createPropertyAssignment(
              "line",
              ts.factory.createNumericLiteral(location.end.line + 1),
            ),
            ts.factory.createPropertyAssignment(
              "character",
              ts.factory.createNumericLiteral(location.end.character + 1),
            ),
          ],
          false,
        ),
      ),
    ],
    false,
  );
}
