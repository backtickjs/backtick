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

// The classifier: a valued `return` makes a value body, as does exiting
// every path with no `return` at all (a throw-only block). Bare returns
// are an action's early exit.
export function bodyKind(
  ts: typeof import("typescript"),
  block: ts.Block,
): "value" | "action" {
  const returns = ownReturn(ts, block);
  const valued = ownReturn(ts, block, true);
  const exits = terminates(ts, block);
  return valued || (exits && !returns) ? "value" : "action";
}

// A body with a valued `return` that doesn't return on every path — the
// "Not all code paths return a value" hole. A throw-only value body has
// no valued return, so it doesn't read as partial.
export function partialReturn(
  ts: typeof import("typescript"),
  block: ts.Block,
): boolean {
  return ownReturn(ts, block, true) && !terminates(ts, block);
}
