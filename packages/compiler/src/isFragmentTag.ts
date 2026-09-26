/**
 * The fragment's name, which is the one it is written under: `<Fragment>` says
 * it, and TypeScript resolves `<>` to the `Fragment` the configured jsx runtime
 * exports. The element the language draws it as carries the same name, so a
 * bundle says what the script said.
 *
 * Capitalized, which is what keeps it out of the elements a target declares:
 * a lowercase first letter is what makes a tag intrinsic, so no target can
 * name an element this.
 */
export const FRAGMENT_TAG = "Fragment";

// Whether a tag names the fragment, which draws no node of its own. `<>` is the
// shorthand for it — so the name is the rule, the way a lowercase first letter
// is the rule for an element.
export function isFragmentTag(tagName: string): boolean {
  return tagName === FRAGMENT_TAG;
}
