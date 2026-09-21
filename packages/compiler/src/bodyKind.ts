import type ts from "typescript";

// Whether the block's own body has a `return` — with `valued`, only one
// that returns a value; returns inside nested arrows don't count.
function ownReturn(
  ts: typeof import("typescript"),
  node: ts.Node,
  valued = false,
): boolean {
  if (ts.isReturnStatement(node)) {
    return !valued || node.expression != null;
  }
  if (ts.isArrowFunction(node)) {
    return false;
  }
  return (
    ts.forEachChild(node, (child) =>
      ownReturn(ts, child, valued) ? true : undefined,
    ) ?? false
  );
}

// Whether every path through the statement returns or throws. Syntactic,
// like `noImplicitReturns`: `if (true) { return 1; }` still reads as
// fall-through.
function terminates(
  ts: typeof import("typescript"),
  statement: ts.Statement,
): boolean {
  if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) {
    return true;
  }
  if (ts.isBlock(statement)) {
    return statement.statements.some((s) => terminates(ts, s));
  }
  if (ts.isIfStatement(statement)) {
    return (
      statement.elseStatement != null &&
      terminates(ts, statement.thenStatement) &&
      terminates(ts, statement.elseStatement)
    );
  }
  if (ts.isTryStatement(statement)) {
    return (
      statement.catchClause != null &&
      terminates(ts, statement.tryBlock) &&
      terminates(ts, statement.catchClause.block)
    );
  }
  return false;
}

// The classifier. An expression body implicitly returns its expression —
// a value body. In a block, a valued `return` makes a value body, as does
// exiting every path with no `return` at all (a throw-only block); bare
// returns are an action's early exit.
export function bodyKind(
  ts: typeof import("typescript"),
  body: ts.Block | ts.Expression,
): "value" | "action" {
  if (!ts.isBlock(body)) {
    return "value";
  }
  const returns = ownReturn(ts, body);
  const valued = ownReturn(ts, body, true);
  const exits = terminates(ts, body);
  return valued || (exits && !returns) ? "value" : "action";
}
