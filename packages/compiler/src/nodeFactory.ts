import type * as ES from "estree";
import type ts from "typescript";

/** An ESTree node or location as the object literal that builds it. */
export function object(
  ts: typeof import("typescript"),
  node: ES.Node | ES.SourceLocation,
): ts.ObjectLiteralExpression {
  return literal(ts, node) as ts.ObjectLiteralExpression;
}

function literal(
  ts: typeof import("typescript"),
  value: unknown,
): ts.Expression {
  if (value === null) {
    return ts.factory.createNull();
  }
  if (typeof value === "boolean") {
    return value ? ts.factory.createTrue() : ts.factory.createFalse();
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value < 0 || Object.is(value, -0)) {
      throw new Error(`${value} is not a value a node holds`);
    }
    return ts.factory.createNumericLiteral(value);
  }
  if (typeof value === "string") {
    return ts.factory.createStringLiteral(value);
  }
  if (Array.isArray(value)) {
    return ts.factory.createArrayLiteralExpression(
      value.map((member) => literal(ts, member)),
      false,
    );
  }
  if (typeof value === "object") {
    return ts.factory.createObjectLiteralExpression(
      Object.entries(value)
        .filter(([, member]) => member !== undefined)
        .map(([key, member]) =>
          ts.factory.createPropertyAssignment(
            /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
              ? key
              : ts.factory.createStringLiteral(key),
            literal(ts, member),
          ),
        ),
      false,
    );
  }
  throw new Error(`${typeof value} is not a value a node holds`);
}

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

/** <const|let|var> <name>[: <type>] = <initializer> — the list, without the
 * semicolon a statement would add, so it also fits a `for` header.
 *
 * The annotation is carried because it is the only way to say what an empty
 * collection holds: `let rows: Row[] = []` reads as `never[]` without it, and
 * nothing can be put in it afterwards. */
export function varDeclList(
  ts: typeof import("typescript"),
  flags: ts.NodeFlags,
  name: string | ts.BindingName,
  initializer: ts.Expression,
  type?: ts.TypeNode,
): ts.VariableDeclarationList {
  return ts.factory.createVariableDeclarationList(
    [ts.factory.createVariableDeclaration(name, undefined, type, initializer)],
    flags,
  );
}

/** <const|let|var> <name> = <initializer>; */
export function varDecl(
  ts: typeof import("typescript"),
  flags: ts.NodeFlags,
  name: string | ts.BindingName,
  initializer: ts.Expression,
): ts.VariableStatement {
  return ts.factory.createVariableStatement(
    undefined,
    varDeclList(ts, flags, name, initializer),
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
