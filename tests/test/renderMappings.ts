import type { SourceMapping } from "@backtickjs/compiler";
import { parseSourceText } from "@backtickjs/compiler";
import ts from "typescript";

// The source spans covered by top-level `cs` templates (which enclose any
// nested scripts). Used to drop the identity mappings for the surrounding code,
// so the snapshot only shows how the compiled scripts map back to source.
function scriptRanges(
  fileName: string,
  sourceText: string,
): Array<[start: number, end: number]> {
  const { sourceFile, scripts } = parseSourceText(ts, fileName, sourceText);
  return scripts.map((script) => [
    script.sourceNode.getStart(sourceFile),
    script.sourceNode.getEnd(),
  ]);
}

// A mapping's non-default editor behavior, rendered as `[-flag …]`: `-` is
// the flag off, `+` on. A `cs.splice(...)` wrapper hides hover
// (`[-semantic]`).
// Rows without data carry the defaults (everything on) and render bare.
function renderData(data: SourceMapping["data"]): string {
  if (!data) {
    return "";
  }
  const flags = Object.entries(data)
    .map(([flag, value]) => `${value ? "+" : "-"}${flag}`)
    .join(" ");
  return ` [${flags}]`;
}

// Render each source-map entry as `<generated>  → <source>`, escaping newlines
// so a mapping stays on a single line and aligning the arrows into a column.
// Identity mappings for the code surrounding the `cs` scripts are dropped.
export function renderMappings(
  fileName: string,
  virtualCode: string,
  sourceText: string,
  mappings: SourceMapping[],
): string {
  const ranges = scriptRanges(fileName, sourceText);

  const escapeText = (text: string): string =>
    text
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");

  const inScript = (offset: number): boolean =>
    ranges.some(([start, end]) => offset >= start && offset < end);

  const rows: Array<
    [generatedOffset: number, generated: string, source: string, data: string]
  > = [];
  for (const mapping of mappings) {
    for (let i = 0; i < mapping.generatedOffsets.length; i++) {
      if (!inScript(mapping.sourceOffsets[i])) {
        continue;
      }
      const generatedOffset = mapping.generatedOffsets[i];
      const generated = virtualCode.slice(
        generatedOffset,
        generatedOffset + mapping.generatedLengths[i],
      );
      const source = sourceText.slice(
        mapping.sourceOffsets[i],
        mapping.sourceOffsets[i] + mapping.lengths[i],
      );
      rows.push([
        generatedOffset,
        escapeText(generated),
        escapeText(source),
        renderData(mapping.data),
      ]);
    }
  }
  rows.sort((a, b) => a[0] - b[0]);

  // Align the arrows, but let a rare long row overflow the column rather
  // than pushing every arrow far right.
  const width =
    Math.min(
      40,
      Math.max(0, ...rows.map(([, generated]) => generated.length)),
    ) + 2;
  return `${rows
    .map(
      ([, generated, source, data]) =>
        `${generated.padEnd(width)}→ ${source}${data}`,
    )
    .join("\n")}\n`;
}
