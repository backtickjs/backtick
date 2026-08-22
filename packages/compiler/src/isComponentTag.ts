// Whether a tag names a component rather than one of the target's elements.
//
// TypeScript's own rule, spelled out because it does not publish it (`ts`'s
// `isIntrinsicJsxName` is internal): a name starting lowercase, or holding a
// `-` or a `:`, is the target's, and anything else is a value in scope. Written
// here so a tag reads the same to the compiler as it does to the checker, which
// applies this rule to the virtual code.
export function isComponentTag(tagName: string): boolean {
  const first = tagName.charCodeAt(0);
  const intrinsic =
    (first >= 0x61 /* a */ && first <= 0x7a) /* z */ ||
    tagName.includes("-") ||
    tagName.includes(":");
  return !intrinsic;
}
