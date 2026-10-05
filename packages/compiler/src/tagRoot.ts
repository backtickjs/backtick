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
