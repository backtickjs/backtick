import type ts from "typescript";
import { buildMappings, type SourceMapping } from "./buildMappings.js";
import type { CompiledFile } from "./compileFile.js";
import type { ClientScript, ParsedFile, Splice } from "./parseFile.js";
import { type Segment, segmentsToString } from "./segmentsToString.js";

interface VirtualizedFile {
  virtualCode: string;
  mappings: SourceMapping[];
}

export function printVirtualCode(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
  compiledFile: CompiledFile,
): VirtualizedFile {
  const { sourceFile } = parsedFile;
  const segments: Segment[] = [];

  let cursor = 0;
  for (const script of parsedFile.scripts) {
    const start = script.sourceNode.getStart(sourceFile);
    segments.push(...renderVerbatim(sourceFile.text, cursor, start - cursor));
    segments.push(...renderScript(ts, sourceFile, compiledFile, script));
    cursor = script.sourceNode.getEnd();
  }
  segments.push(
    ...renderVerbatim(sourceFile.text, cursor, sourceFile.text.length - cursor),
  );

  return {
    virtualCode: segmentsToString(segments),
    mappings: buildMappings(segments),
  };
}

// Renders one script: print its compiled body, then replace each `$0splice<n>`
// placeholder with the corresponding host expression.
function renderScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiledFile: CompiledFile,
  script: ClientScript,
): Segment[] {
  const node = compiledFile.scripts.get(script.sourceNode)?.virtual;
  if (!node) {
    return [];
  }

  const identifiersWithSourceMap: Segment[] = [];

  const printer = ts.createPrinter(
    {},
    {
      substituteNode(_hint, emitted) {
        const range = ts.getSourceMapRange(emitted);

        const hasSourceMap = range !== emitted && range.end > range.pos;
        if (hasSourceMap && ts.isIdentifier(emitted)) {
          identifiersWithSourceMap.push([
            emitted.text,
            undefined,
            range.pos,
            range.end - range.pos,
          ]);
          const index = identifiersWithSourceMap.length - 1;
          return ts.factory.createIdentifier(`$0id${index}`);
        }

        return emitted;
      },
    },
  );

  const text = printer.printNode(
    ts.EmitHint.Unspecified,
    node,
    script.fileWithPlaceholders,
  );

  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of text.matchAll(/\$0id(\d+)/g)) {
    if (match.index > cursor) {
      segments.push(text.slice(cursor, match.index));
    }
    segments.push(identifiersWithSourceMap[Number(match[1])]);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) {
    segments.push(text.slice(cursor));
  }

  return segments.flatMap((segment) =>
    typeof segment === "string"
      ? reinjectSplices(ts, sourceFile, compiledFile, script, segment)
      : [segment],
  );
}

function reinjectSplices(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiledFile: CompiledFile,
  script: ClientScript,
  text: string,
): Segment[] {
  const segments: Segment[] = [];
  let textStart = 0;

  for (const match of text.matchAll(/\$0splice\d+/g)) {
    segments.push(text.slice(textStart, match.index));
    segments.push(
      ...renderSplice(ts, sourceFile, compiledFile, script.splices[match[0]]),
    );
    textStart = match.index + match[0].length;
  }

  segments.push(text.slice(textStart));
  return segments;
}

function renderSplice(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiledFile: CompiledFile,
  splice: Splice,
): Segment[] {
  const segments: Segment[] = [];
  const expression = splice.sourceNode.expression;
  const end = expression.getEnd();

  let cursor = expression.getStart(sourceFile);
  for (const nested of splice.scripts) {
    const start = nested.sourceNode.getStart(sourceFile);
    segments.push(...renderVerbatim(sourceFile.text, cursor, start - cursor));
    segments.push(...renderScript(ts, sourceFile, compiledFile, nested));
    cursor = nested.sourceNode.getEnd();
  }
  segments.push(...renderVerbatim(sourceFile.text, cursor, end - cursor));

  return segments;
}

// Append source text `[start, start + length)` mapped 1:1 back to source.
function renderVerbatim(
  sourceText: string,
  start: number,
  length: number,
): Segment[] {
  if (length <= 0) {
    return [];
  }
  return [[sourceText.slice(start, start + length), undefined, start, length]];
}
