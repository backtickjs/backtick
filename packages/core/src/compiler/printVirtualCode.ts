import type ts from "typescript";
import { buildMappings, type SourceMapping } from "./buildMappings.js";
import { printMarkedNode, scanMarkers } from "./markers.js";
import type { ClientScript, ParsedFile, Splice } from "./parseFile.js";
import type { RewrittenFile } from "./rewriteFile.js";
import type { SourceRange } from "./SourceRange.js";
import { type Segment, segmentsToString } from "./segmentsToString.js";

// An enclosing mapped node: its source `range`, and a `cursor` tracking how far
// into that range has already been attributed (advanced past nested children so
// a parent only claims the source its children didn't).
type Frame = { range: SourceRange; cursor: number };

interface VirtualizedFile {
  virtualCode: string;
  mappings: SourceMapping[];
}

export function printVirtualCode(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
  rewrittenFile: RewrittenFile,
): VirtualizedFile {
  const { sourceFile } = parsedFile;
  const segments: Segment[] = [];

  let cursor = 0;
  for (const script of parsedFile.scripts) {
    const start = script.sourceNode.getStart(sourceFile);
    segments.push(...renderVerbatim(sourceFile.text, cursor, start - cursor));
    segments.push(...renderScript(ts, sourceFile, rewrittenFile, script));
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

function renderScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  rewrittenFile: RewrittenFile,
  script: ClientScript,
): Segment[] {
  const node = rewrittenFile.scripts.get(script.sourceNode)?.virtual;
  if (!node) {
    return [];
  }

  const { marked, spans } = printMarkedNode(
    ts,
    node,
    script.fileWithPlaceholders,
    rewrittenFile.sourceMaps,
  );

  const { text, events } = scanMarkers(marked);
  const segments: Segment[] = [];
  const stack: Frame[] = [];
  let lastPos = 0;

  // Emit the generated text `[lastPos, pos)` and advance. When it sits inside a
  // mapped node, attribute it to that node's still-unclaimed source
  // `[cursor, boundary)`; otherwise emit it unmapped.
  const flush = (top: Frame | undefined, pos: number, boundary?: number) => {
    if (pos > lastPos) {
      const chunk = text.slice(lastPos, pos);
      if (top && boundary != null) {
        const end = Math.max(top.cursor, boundary);
        segments.push([chunk, undefined, top.cursor, end - top.cursor]);
      } else {
        segments.push(chunk);
      }
    }
    lastPos = pos;
  };

  for (const event of events) {
    const top = stack[stack.length - 1];

    if (event.type === "open") {
      const range = spans[event.id];
      flush(top, event.pos, range.start);
      // The child claims its whole range, so the parent skips past it.
      if (top) {
        top.cursor = Math.max(top.cursor, range.end);
      }
      stack.push({ range, cursor: range.start });
    } else if (event.type === "close") {
      flush(top, event.pos, top?.range.end);
      stack.pop();
    } else {
      const splice = script.splices[event.placeholder];
      const { expression } = splice;
      // The cursor jumps over the `${`/`}` delimiters, which exist in the
      // source only: no virtual text claims them, and `cs.splice(` and `)`
      // attribute to zero-width ranges at the expression's edges.
      if (top) {
        top.cursor = Math.max(top.cursor, expression.getStart(sourceFile));
      }
      flush(top, event.pos, expression.getStart(sourceFile));
      segments.push(...renderSplice(ts, sourceFile, rewrittenFile, splice));
      if (top) {
        const brace = sourceFile.text.indexOf("}", expression.getEnd());
        top.cursor = Math.max(top.cursor, brace + 1);
      }
      lastPos = event.pos + event.placeholder.length;
    }
  }

  flush(undefined, text.length);
  return segments;
}

function renderSplice(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  rewrittenFile: RewrittenFile,
  splice: Splice,
): Segment[] {
  const segments: Segment[] = [];
  const expression = splice.expression;
  const end = expression.getEnd();

  let cursor = expression.getStart(sourceFile);
  for (const nested of splice.scripts) {
    const start = nested.sourceNode.getStart(sourceFile);
    segments.push(...renderVerbatim(sourceFile.text, cursor, start - cursor));
    segments.push(...renderScript(ts, sourceFile, rewrittenFile, nested));
    cursor = nested.sourceNode.getEnd();
  }
  segments.push(...renderVerbatim(sourceFile.text, cursor, end - cursor));

  return segments;
}

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
