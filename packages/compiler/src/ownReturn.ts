import type ts from "typescript";

// Whether the block's own body has a `return`; returns inside nested
// arrows don't count.
export function ownReturn(
  ts: typeof import("typescript"),
  node: ts.Node,
): boolean {
  if (ts.isReturnStatement(node)) {
    return true;
  }
  if (ts.isArrowFunction(node)) {
    return false;
  }
  return (
    ts.forEachChild(node, (child) =>
      ownReturn(ts, child) ? true : undefined,
    ) ?? false
  );
}
