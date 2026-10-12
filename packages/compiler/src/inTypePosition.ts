import type ts from "typescript";

// Whether a name stands in a type, which names types rather than values: all
// but what a `typeof` reads, and a class's `extends`.
export function inTypePosition(
  ts: typeof import("typescript"),
  node: ts.Identifier,
): boolean {
  for (let at: ts.Node = node; at.parent !== undefined; at = at.parent) {
    const parent = at.parent;
    if (ts.isTypeQueryNode(parent)) {
      return false;
    }
    if (
      ts.isExpressionWithTypeArguments(parent) &&
      ts.isHeritageClause(parent.parent) &&
      ts.isClassLike(parent.parent.parent)
    ) {
      return false;
    }
    if (ts.isTypeNode(parent)) {
      return true;
    }
  }
  return false;
}
