import type ts from "typescript";

// The name a tag starts with: `Card` in `<Card>`, `Animated` in
// `<Animated.View>`; none where it starts with `this`.
export function tagRoot(
  ts: typeof import("typescript"),
  tagName: ts.JsxTagNameExpression,
): ts.Identifier | undefined {
  let at: ts.Node = tagName;
  while (ts.isPropertyAccessExpression(at)) {
    at = at.expression;
  }
  return ts.isIdentifier(at) ? at : undefined;
}

// Whether a name is what a tag starts with, opening or closing.
export function isTagRoot(
  ts: typeof import("typescript"),
  node: ts.Identifier,
): boolean {
  let tagName: ts.Node = node;
  while (
    ts.isPropertyAccessExpression(tagName.parent) &&
    tagName.parent.expression === tagName
  ) {
    tagName = tagName.parent;
  }
  const parent = tagName.parent;
  return (
    (ts.isJsxOpeningElement(parent) ||
      ts.isJsxSelfClosingElement(parent) ||
      ts.isJsxClosingElement(parent)) &&
    parent.tagName === tagName
  );
}
