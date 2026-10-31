export type Edit = { old_str: string; new_str: string };

// In order, each on the last's result, and all or none: the first edit that
// doesn't match exactly once is the error, for the model to fix.
export function applyEdits(
  source: string,
  edits: Edit[],
): { code: string } | { error: string } {
  let code = source;
  for (const [index, { old_str, new_str }] of edits.entries()) {
    const matches = code.split(old_str).length - 1;
    if (matches === 0) {
      return {
        error: `Nothing was saved: edit ${index + 1} has no match for old_str. Check the text, or get_app for the latest, and try again.`,
      };
    }
    if (matches > 1) {
      return {
        error: `Nothing was saved: edit ${index + 1}'s old_str matches ${matches} places. Include more of the text around it, so it matches once.`,
      };
    }
    const at = code.indexOf(old_str);
    code = code.slice(0, at) + new_str + code.slice(at + old_str.length);
  }
  return { code };
}
