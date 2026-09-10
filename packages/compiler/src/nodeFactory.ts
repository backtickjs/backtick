import type {
  ClientScriptKind,
  SourceLocation,
} from "@backtickjs/client-script";
import type ts from "typescript";

/** An AST node as the emitted code spells it: `{ kind: "if", … }`.
 *
 * The compiler writes the bundler's AST directly, so the fields are named
 * rather than positional — a node gaining one is additive, where an argument
 * list gaining one shifts everything after it in code already compiled. The
 * kind goes as the word for it, which reads back without a table to look it
 * up in. */
export function astNode(
  ts: typeof import("typescript"),
  kind: ClientScriptKind,
  fields: { [name: string]: ts.Expression },
): ts.ObjectLiteralExpression {
  return ts.factory.createObjectLiteralExpression(
    [
      ts.factory.createPropertyAssignment(
        "kind",
        ts.factory.createStringLiteral(kind),
      ),
      ...Object.entries(fields).map(([name, value]) =>
        ts.factory.createPropertyAssignment(name, value),
      ),
    ],
    true,
  );
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

// The compiler's positions are 0-based; the emitted tuple is 1-based, the
// way a stack trace prints them.
export function sourceLoc(
  ts: typeof import("typescript"),
  location: SourceLocation,
): ts.ArrayLiteralExpression {
  return ts.factory.createArrayLiteralExpression(
    location.map((position) => ts.factory.createNumericLiteral(position + 1)),
    false,
  );
}
