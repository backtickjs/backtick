import type ts from "typescript";

// Whether a name stands in a type, which names types rather than values: all
// but what a `typeof` reads, and what `namesValue` says is a value.
export function inTypePosition(
  ts: typeof import("typescript"),
  node: ts.Identifier,
): boolean {
  for (let at: ts.Node = node; at.parent !== undefined; at = at.parent) {
    const parent = at.parent;
    if (ts.isTypeQueryNode(parent)) {
      return false;
    }
    if (namesValue(ts, parent)) {
      return false;
    }
    if (ts.isTypeNode(parent)) {
      return true;
    }
  }
  return false;
}

// A type node that names a value: `f<T>`, a function given type arguments,
// and a class's `extends Base<T>`. `implements` and an interface's `extends`
// name types.
export function namesValue(
  ts: typeof import("typescript"),
  node: ts.Node,
): boolean {
  if (!ts.isExpressionWithTypeArguments(node)) {
    return false;
  }
  const clause = node.parent;
  return (
    !ts.isHeritageClause(clause) ||
    (clause.token === ts.SyntaxKind.ExtendsKeyword &&
      ts.isClassLike(clause.parent))
  );
}
