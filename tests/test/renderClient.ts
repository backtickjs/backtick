import type { EmittedScriptAt } from "@backtickjs/compiler";

// Where an offset of `text` stands, as `line:column`, both from 1.
function position(text: string, offset: number): string {
  const lines = text.slice(0, offset).split("\n");
  return `${lines.length}:${lines[lines.length - 1]!.length + 1}`;
}

// What each script compiles to for the client, by where it was written.
export function renderClientCode(
  sourceText: string,
  scripts: readonly EmittedScriptAt[],
): string {
  return scripts
    .map(
      (script) => `// ${position(sourceText, script.start)}\n${script.code}\n`,
    )
    .join("\n");
}

const BASE64 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// A source map's `mappings`, decoded: per generated line, each segment's
// generated column and, where it has one, the source line and column it maps
// to (from 0).
function decode(
  mappings: string,
): Array<Array<[column: number, line?: number, sourceColumn?: number]>> {
  let sourceLine = 0;
  let sourceColumn = 0;
  return mappings.split(";").map((line) => {
    let column = 0;
    return line
      .split(",")
      .filter(Boolean)
      .map((segment) => {
        const fields: number[] = [];
        let value = 0;
        let shift = 0;
        for (const char of segment) {
          const digit = BASE64.indexOf(char);
          value += (digit & 31) << shift;
          if (digit & 32) {
            shift += 5;
          } else {
            fields.push(value & 1 ? -(value >> 1) : value >> 1);
            value = 0;
            shift = 0;
          }
        }
        column += fields[0]!;
        if (fields.length < 4) {
          return [column];
        }
        sourceLine += fields[2]!;
        sourceColumn += fields[3]!;
        return [column, sourceLine, sourceColumn];
      });
  });
}

const escape = (text: string): string =>
  text.replace(/\\/g, "\\\\").replace(/\t/g, "\\t");

// Each script's source map as `<generated>  → line:column <source>`: a
// segment of the emitted code, and the host text it maps to. A map records
// only where a segment starts, so the text shown is as long as the segment
// where the two read the same; where they differ — a splice lowered to
// `$splice0(…)`, say — it is only the first token there, marked `…`. The host file
// is the reader's to see, so the map carries no text of its own — which is
// recorded too.
export function renderClientMappings(
  sourceText: string,
  scripts: readonly EmittedScriptAt[],
): string {
  const sourceLines = sourceText.split("\n");
  return scripts
    .map((script) => {
      const map = JSON.parse(script.map) as {
        mappings: string;
        sourcesContent?: unknown;
      };
      const codeLines = script.code.split("\n");
      const rows: Array<[string, string]> = [];
      decode(map.mappings).forEach((segments, line) => {
        segments.forEach(([column, toLine, toColumn], index) => {
          const next = segments[index + 1]?.[0] ?? codeLines[line]?.length;
          const generated = codeLines[line]?.slice(column, next) ?? "";
          if (generated.trim() === "" || toLine === undefined) {
            return;
          }
          const sourceLine = sourceLines[toLine] ?? "";
          const same = sourceLine.slice(toColumn, toColumn! + generated.length);
          const source =
            same === generated
              ? same
              : `${/^\s*\S*/.exec(sourceLine.slice(toColumn))![0]}…`;
          rows.push([
            escape(generated),
            `${toLine + 1}:${toColumn! + 1} ${escape(source)}`,
          ]);
        });
      });
      const width = Math.max(0, ...rows.map(([generated]) => generated.length));
      const header = `// ${position(sourceText, script.start)}${
        "sourcesContent" in map ? " (carries sourcesContent)" : ""
      }`;
      return [
        header,
        ...rows.map(
          ([generated, source]) => `${generated.padEnd(width)}  → ${source}`,
        ),
      ].join("\n");
    })
    .join("\n\n");
}
