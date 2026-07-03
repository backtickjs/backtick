import type ts from "typescript";
import type { SourceRange } from "../cs-runtime/index.js";
import { buildMappings, type SourceMapping } from "./buildMappings.js";
import type { ClientScript, ParsedFile, Splice } from "./parseFile.js";
import type { RewrittenFile } from "./rewriteFile.js";
import { type Segment, segmentsToString } from "./segmentsToString.js";

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

// A boundary discovered in the printed virtual code: the start/end of a mapped
// node, or a `$0splice<n>` placeholder. Positions are offsets into the
// marker-free virtual code.
type MarkerEvent =
  | { type: "open"; pos: number; id: number }
  | { type: "close"; pos: number; id: number }
  | { type: "splice"; pos: number; placeholder: string };

// Renders one script. Every mapped virtual node is printed wrapped in a pair of
// marker comments so we can recover its generated span, then those spans are
// flattened into distinct, non-overlapping source mappings (a nested node's
// range wins over its ancestors', which fill only the surrounding gaps).
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

  // Tag each mapped node with `/*$0S<id>*/ … /*$0E<id>*/`. The printer emits a
  // single space next to each marker comment, which `scanMarkers` strips to
  // reproduce the exact virtual code.
  const spans: SourceRange[] = [];
  const markers = new Map<ts.Node, number>();
  const printer = ts.createPrinter(
    {},
    {
      substituteNode(_hint, emitted) {
        const range = rewrittenFile.sourceMaps.get(emitted);
        if (range != null && !markers.has(emitted)) {
          const id = spans.length;
          spans.push(range);
          markers.set(emitted, id);
          ts.addSyntheticLeadingComment(
            emitted,
            ts.SyntaxKind.MultiLineCommentTrivia,
            `$0S${id}`,
            false,
          );
          ts.addSyntheticTrailingComment(
            emitted,
            ts.SyntaxKind.MultiLineCommentTrivia,
            `$0E${id}`,
            false,
          );
        }
        return emitted;
      },
    },
  );

  const marked = printer.printNode(
    ts.EmitHint.Unspecified,
    node,
    script.fileWithPlaceholders,
  );

  const { text, events } = scanMarkers(marked);
  return assemble(ts, sourceFile, rewrittenFile, script, text, events, spans);
}

// Strip the marker comments (and the single space the printer pads them with),
// returning the clean virtual code plus the ordered boundaries within it.
function scanMarkers(marked: string): {
  text: string;
  events: MarkerEvent[];
} {
  const openMarker = /\/\*\$0S(\d+)\*\/ /y;
  const closeMarker = / \/\*\$0E(\d+)\*\//y;
  const splice = /\$0splice\d+/y;

  let text = "";
  const events: MarkerEvent[] = [];
  let index = 0;
  while (index < marked.length) {
    openMarker.lastIndex = index;
    const open = openMarker.exec(marked);
    if (open) {
      events.push({ type: "open", pos: text.length, id: Number(open[1]) });
      index = openMarker.lastIndex;
      continue;
    }
    closeMarker.lastIndex = index;
    const close = closeMarker.exec(marked);
    if (close) {
      events.push({ type: "close", pos: text.length, id: Number(close[1]) });
      index = closeMarker.lastIndex;
      continue;
    }
    splice.lastIndex = index;
    const placeholder = splice.exec(marked);
    if (placeholder) {
      events.push({
        type: "splice",
        pos: text.length,
        placeholder: placeholder[0],
      });
      text += placeholder[0];
      index = splice.lastIndex;
      continue;
    }
    text += marked[index];
    index += 1;
  }
  return { text, events };
}

// Walk the boundaries left to right, maintaining a stack of the enclosing mapped
// nodes. Text between boundaries is attributed to the innermost node on the
// stack, sliced from the part of its source range not claimed by a child.
function assemble(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  rewrittenFile: RewrittenFile,
  script: ClientScript,
  text: string,
  events: MarkerEvent[],
  spans: SourceRange[],
): Segment[] {
  const segments: Segment[] = [];
  const stack: Array<{ range: SourceRange; cursor: number }> = [];
  let lastPos = 0;

  for (const event of events) {
    const top = stack[stack.length - 1];

    // Where, in source, the upcoming boundary sits. The gap text before it is
    // attributed to `top` up to this point.
    const boundary =
      event.type === "open"
        ? spans[event.id].start
        : event.type === "splice"
          ? script.splices[event.placeholder].sourceNode.expression.getStart(
              sourceFile,
            )
          : top?.range.end;

    if (event.pos > lastPos) {
      const chunk = text.slice(lastPos, event.pos);
      if (top && boundary != null) {
        const start = top.cursor;
        const end = Math.max(start, boundary);
        segments.push([chunk, undefined, start, end - start]);
      } else {
        segments.push(chunk);
      }
    }
    lastPos = event.pos;

    if (event.type === "open") {
      const range = spans[event.id];
      if (top) {
        top.cursor = Math.max(top.cursor, range.end);
      }
      stack.push({ range, cursor: range.start });
    } else if (event.type === "close") {
      stack.pop();
    } else {
      const splice = script.splices[event.placeholder];
      segments.push(...renderSplice(ts, sourceFile, rewrittenFile, splice));
      if (top) {
        top.cursor = Math.max(
          top.cursor,
          splice.sourceNode.expression.getEnd(),
        );
      }
      lastPos = event.pos + event.placeholder.length;
    }
  }

  if (lastPos < text.length) {
    segments.push(text.slice(lastPos));
  }

  return segments;
}

function renderSplice(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  rewrittenFile: RewrittenFile,
  splice: Splice,
): Segment[] {
  const segments: Segment[] = [];
  const expression = splice.sourceNode.expression;
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
