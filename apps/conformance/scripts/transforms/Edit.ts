/**
 * A replacement of `source.slice(start, end)` by `text`, in offsets of the
 * case's own source. Every transform answers with these rather than a new
 * source, so that each reads the case as written and none has to know what
 * another changed.
 */
export type Edit = { start: number; end: number; text: string };

/** The source with every edit applied. No two edits overlap. */
export function applyEdits(source: string, edits: readonly Edit[]): string {
  const ordered = [...edits].sort((a, b) => a.start - b.start);
  let applied = "";
  let from = 0;
  for (const edit of ordered) {
    applied += source.slice(from, edit.start) + edit.text;
    from = edit.end;
  }
  return applied + source.slice(from);
}
