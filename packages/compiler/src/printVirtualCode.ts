import type ts from "typescript";
import { buildMappings, type SourceMapping } from "./buildMappings.js";
import type { ClientScript, ParsedFile, Splice } from "./parseFile.js";
import type { RewrittenFile } from "./rewriteFile.js";
import { mayAwait } from "./rewriteScript.js";
import { type Segment, segmentsToString } from "./segmentsToString.js";
import { virtualScript } from "./virtualScript.js";

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
  const rewritten = rewrittenFile.scripts.get(script.sourceNode);
  if (rewritten === undefined) {
    return [];
  }
  // Left as written, its errors already said: `never` fits wherever it
  // stands, so nothing else is reported for it.
  if (rewritten.leftAsWritten) {
    return ["cs.lift(undefined as never)"];
  }
  return virtualScript(ts, script, rewrittenFile.bindings, (splice) =>
    renderSplice(
      ts,
      sourceFile,
      rewrittenFile,
      splice,
      mayAwait(ts, script.sourceNode),
    ),
  );
}

// A splice's host code, each nested script rendered as a script wherever it's
// written. Where the host may await, an `await x` of its own is
// `cs.awaited(x)`: what the host's `await` gives, legal wherever in the script
// the splice stands. Elsewhere it's left as written, for the typechecker to
// refuse. An `await` in a function the splice holds is that function's own.
function renderSplice(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  rewrittenFile: RewrittenFile,
  splice: Splice,
  awaitable: boolean,
): Segment[] {
  const nested = new Map<ts.Node, ClientScript>(
    splice.scripts.map((script) => [script.sourceNode, script]),
  );
  const render = (node: ts.Node, own: boolean): Segment[] => {
    const script = nested.get(node);
    if (script !== undefined) {
      return renderScript(ts, sourceFile, rewrittenFile, script);
    }
    if (own && awaitable && ts.isAwaitExpression(node)) {
      return ["cs.awaited(", ...render(node.expression, own), ")"];
    }
    // As written, each child rendered in place.
    const inner = own && !ts.isFunctionLike(node);
    const segments: Segment[] = [];
    let at = node.getStart(sourceFile);
    ts.forEachChild(node, (child) => {
      const start = child.getStart(sourceFile);
      segments.push(...renderVerbatim(sourceFile.text, at, start - at));
      segments.push(...render(child, inner));
      at = child.getEnd();
    });
    segments.push(...renderVerbatim(sourceFile.text, at, node.getEnd() - at));
    return segments;
  };
  return render(splice.expression, true);
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
