// JSX text as JSX reads it, or null where it reads as nothing. Not `trim()`:
// the rule is per line — leading whitespace goes from every line but the first,
// trailing from every line but the last, a line left empty drops, and what
// remains joins with one space. So `<p>a b</p>` written across three lines is
// `"a b"`, and the space in `<p>{x} {y}</p>` survives, where trimming would
// take one and lose the other.
export function jsxText(text: string): string | null {
  const lines = text.split(/\r\n|[\n\r]/);
  const kept: string[] = [];
  for (let at = 0; at < lines.length; at++) {
    let line = lines[at];
    if (at !== 0) {
      line = line.replace(/^[\t ]+/, "");
    }
    if (at !== lines.length - 1) {
      line = line.replace(/[\t ]+$/, "");
    }
    if (line.length > 0) {
      kept.push(line);
    }
  }
  return kept.length === 0 ? null : kept.join(" ");
}
