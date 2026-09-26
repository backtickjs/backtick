import { readFileSync } from "node:fs";
import { join } from "node:path";
import { decodedMappings, TraceMap } from "@jridgewell/trace-mapping";

const escape = (text: string): string =>
  text.replace(/\\/g, "\\\\").replace(/\t/g, "\\t");

// A bundle's source map as `<generated>  → file line:column <source>`, as
// `renderClientMappings` reads a script's: a segment of the bundle, and the
// host text it maps to, read from the file under this directory. What the
// bundler wrote around the scripts maps to nothing, and is left out.
export function renderBundleMappings(code: string, map: string): string {
  const traced = new TraceMap(map);
  const sources = new Map<number, string[]>();
  const lines = (index: number): string[] => {
    let text = sources.get(index);
    if (text === undefined) {
      text = readFileSync(
        join(import.meta.dirname, traced.sources[index]!),
        "utf8",
      ).split("\n");
      sources.set(index, text);
    }
    return text;
  };
  const codeLines = code.split("\n");
  const rows: [string, string][] = [];
  decodedMappings(traced).forEach((segments, line) => {
    segments.forEach((segment, index) => {
      if (segment.length < 4) {
        return;
      }
      const [column, source, toLine, toColumn] = segment as [
        number,
        number,
        number,
        number,
      ];
      const next = segments[index + 1]?.[0] ?? codeLines[line]?.length;
      const generated = codeLines[line]?.slice(column, next) ?? "";
      if (generated.trim() === "") {
        return;
      }
      const sourceLine = lines(source)[toLine] ?? "";
      const same = sourceLine.slice(toColumn, toColumn + generated.length);
      const text =
        same === generated
          ? same
          : `${/^\s*\S*/.exec(sourceLine.slice(toColumn))![0]}…`;
      rows.push([
        escape(generated),
        `${traced.sources[source]} ${toLine + 1}:${toColumn + 1} ${escape(text)}`,
      ]);
    });
  });
  const width = Math.max(0, ...rows.map(([generated]) => generated.length));
  const header =
    traced.sourcesContent === undefined || traced.sourcesContent === null
      ? ""
      : "// (carries sourcesContent)\n";
  return (
    header +
    rows
      .map(([generated, source]) => `${generated.padEnd(width)}  → ${source}`)
      .join("\n")
  );
}
