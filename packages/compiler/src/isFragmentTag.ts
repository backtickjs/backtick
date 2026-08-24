// Whether a tag names the fragment, which draws no node and lowers to what it
// holds. `<>` is the shorthand for it, and TypeScript resolves that shorthand
// to the `Fragment` the configured jsx runtime exports — so the name is the
// rule, the way a lowercase first letter is the rule for an element.
export function isFragmentTag(tagName: string): boolean {
  return tagName === "Fragment";
}
