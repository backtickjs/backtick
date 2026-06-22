import type ts from "typescript";

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

/** (() => <body>)() */
export function iife(
  ts: typeof import("typescript"),
  body: ts.ConciseBody,
): ts.CallExpression {
  return ts.factory.createCallExpression(
    ts.factory.createParenthesizedExpression(
      ts.factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        undefined,
        body,
      ),
    ),
    undefined,
    [],
  );
}
