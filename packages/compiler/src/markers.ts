import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import type { SourceRange } from "./SourceRange.js";

// A boundary discovered in the printed virtual code: the start/end of a mapped
// node, or a `$0splice<n>` placeholder. Positions are offsets into the
// marker-free virtual code.
export type MarkerEvent =
  | { type: "open"; pos: number; id: number }
  | { type: "close"; pos: number; id: number }
  | { type: "splice"; pos: number; placeholder: string };

// Print `node`, wrapping every mapped virtual node in a pair of marker comments
// `/*$0S<id>*/ … /*$0E<id>*/` so its generated span can be recovered afterwards.
// Returns the raw printed text plus, behind each `<id>`, the source range and
// the editor behavior of the node's mapping (index-aligned with `spans`).
export function printMarkedNode(
  ts: typeof import("typescript"),
  node: ts.Node,
  fileWithPlaceholders: ts.SourceFile,
  sourceMaps: Map<ts.Node, SourceRange>,
  codeInformation: Map<ts.Node, CodeInformation>,
): {
  marked: string;
  spans: SourceRange[];
  datas: (CodeInformation | undefined)[];
} {
  // The printer emits a single space next to each marker comment, which
  // `scanMarkers` strips to reproduce the exact virtual code.
  const spans: SourceRange[] = [];
  const datas: (CodeInformation | undefined)[] = [];
  const markers = new Map<ts.Node, number>();
  const printer = ts.createPrinter(
    {},
    {
      substituteNode(_hint, emitted) {
        const range = sourceMaps.get(emitted);
        if (range != null && !markers.has(emitted)) {
          const id = spans.length;
          spans.push(range);
          datas.push(codeInformation.get(emitted));
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
    fileWithPlaceholders,
  );

  return { marked, spans, datas };
}

// Strip the marker comments (and the single space the printer pads them with),
// returning the clean virtual code plus the ordered boundaries within it.
export function scanMarkers(marked: string): {
  text: string;
  events: MarkerEvent[];
} {
  // A single pass jumps marker-to-marker, copying the verbatim gaps in bulk.
  // The alternatives are tried in order (open, then close, then splice), which
  // — together with each open/close marker consuming its pad space — matches
  // exactly what the code being scanned emitted. Groups 1/2 hold the open/close
  // ids; a match with neither group set is a splice placeholder.
  const marker = /\/\*\$0S(\d+)\*\/ | \/\*\$0E(\d+)\*\/|\$0splice\d+/g;

  let text = "";
  const events: MarkerEvent[] = [];
  let lastIndex = 0;
  for (
    let match = marker.exec(marked);
    match !== null;
    match = marker.exec(marked)
  ) {
    text += marked.slice(lastIndex, match.index);
    if (match[1] !== undefined) {
      events.push({ type: "open", pos: text.length, id: Number(match[1]) });
    } else if (match[2] !== undefined) {
      events.push({ type: "close", pos: text.length, id: Number(match[2]) });
    } else {
      events.push({ type: "splice", pos: text.length, placeholder: match[0] });
      text += match[0];
    }
    lastIndex = marker.lastIndex;
  }
  text += marked.slice(lastIndex);
  return { text, events };
}
