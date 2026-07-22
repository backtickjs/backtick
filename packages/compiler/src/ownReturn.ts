import type ts from "typescript";

// Whether the block's own body has a `return` — with `valued`, only one
// that returns a value; returns inside nested arrows don't count.
export function ownReturn(
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
