import type ts from "typescript";

// Whether every path through the statement returns or throws. Syntactic,
// like `noImplicitReturns`: `if (true) { return 1; }` still reads as
// fall-through.
export function terminates(
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
