import type { CodeInformation, CodeMapping } from "@volar/language-core";
import type ts from "typescript";
import type { CompiledNode } from "./compileScriptNode.js";
import type { ClientScript, ParsedFile, Splice } from "./parseFile.js";

// Mapped regions map verbatim back to a real source range, so every feature is
// enabled across the board.
const CODE_INFORMATION: CodeInformation = {
  completion: true,
  format: false,
  navigation: true,
  semantic: true,
  structure: true,
  verification: true,
};

// `writeNode` and `createTextWriter` are internal to TypeScript but available at
// runtime; we use them to observe where each node lands in the printed body.
interface EmitTextWriter {
  getText(): string;
  getTextPos(): number;
}

interface InternalPrinter extends ts.Printer {
  writeNode(
    hint: ts.EmitHint,
    node: ts.Node,
    sourceFile: ts.SourceFile,
    writer: EmitTextWriter,
  ): void;
}

interface InternalTs {
  createTextWriter(newLine: string): EmitTextWriter;
}

type Compiled = Map<ts.Node, CompiledNode>;
interface Rendered {
  code: string;
  mappings: CodeMapping[];
}

// Accumulates assembled virtual code and the mappings back into the source.
class Builder {
  code = "";
  mappings: CodeMapping[] = [];

  // Append source text `[start, start + length)` and map it 1:1 back to source.
  verbatim(sourceText: string, start: number, length: number): void {
    if (length <= 0) {
      return;
    }
    this.mappings.push({
      sourceOffsets: [start],
      generatedOffsets: [this.code.length],
      lengths: [length],
      generatedLengths: [length],
      data: CODE_INFORMATION,
    });
    this.code += sourceText.slice(start, start + length);
  }

  // Append an already-rendered fragment, shifting its mappings into place.
  append(part: Rendered): void {
    const base = this.code.length;
    for (const m of part.mappings) {
      this.mappings.push({
        ...m,
        generatedOffsets: m.generatedOffsets.map((o) => o + base),
      });
    }
    this.code += part.code;
  }
}

export function printVirtual(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
  compiled: Compiled,
): Rendered {
  const { sourceFile } = parsedFile;
  const out = new Builder();

  let cursor = 0;
  for (const script of sorted(sourceFile, parsedFile.scripts)) {
    const start = script.sourceNode.getStart(sourceFile);
    out.verbatim(sourceFile.text, cursor, start - cursor);
    out.append(renderScript(ts, sourceFile, compiled, script));
    cursor = script.sourceNode.getEnd();
  }
  out.verbatim(sourceFile.text, cursor, sourceFile.text.length - cursor);

  return { code: out.code, mappings: out.mappings };
}

// The runtime output needs no mappings, so we let the printer rewrite the file
// in place via `substituteNode` rather than reassembling it by hand.
export function printRuntime(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
  compiled: Compiled,
): string {
  const printer = ts.createPrinter(
    {},
    { substituteNode: (_hint, node) => compiled.get(node)?.runtime ?? node },
  );
  return printer.printFile(parsedFile.sourceFile);
}

// Renders one script: print its compiled body, then replace each `$0splice<n>`
// placeholder with the corresponding host expression.
function renderScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiled: Compiled,
  script: ClientScript,
): Rendered {
  const node = compiled.get(script.sourceNode)?.virtual;
  if (!node) {
    return { code: "", mappings: [] };
  }

  const body = printBody(ts, node, script.fileWithPlaceholders);
  const out = new Builder();

  let cursor = 0;
  for (const match of body.code.matchAll(/\$0splice\d+/g)) {
    const at = match.index;
    if (at === undefined) {
      continue;
    }
    appendBody(out, body, cursor, at);
    out.append(
      renderSplice(ts, sourceFile, compiled, script.splices[match[0]]),
    );
    cursor = at + match[0].length;
  }
  appendBody(out, body, cursor, body.code.length);

  return { code: out.code, mappings: out.mappings };
}

// Renders a spliced host expression as verbatim source text, recursing into any
// nested `cs` scripts it contains.
function renderSplice(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiled: Compiled,
  splice: Splice,
): Rendered {
  const out = new Builder();
  const expression = splice.sourceNode.expression;
  const end = expression.getEnd();

  let cursor = expression.getStart(sourceFile);
  for (const nested of sorted(sourceFile, splice.scripts)) {
    const start = nested.sourceNode.getStart(sourceFile);
    out.verbatim(sourceFile.text, cursor, start - cursor);
    out.append(renderScript(ts, sourceFile, compiled, nested));
    cursor = nested.sourceNode.getEnd();
  }
  out.verbatim(sourceFile.text, cursor, end - cursor);

  return { code: out.code, mappings: out.mappings };
}

// Prints a compiled body node, collecting a mapping for each stamped identifier.
// Printing against `fileWithPlaceholders` keeps any passed-through nodes pointing
// at text they can be read from.
function printBody(
  ts: typeof import("typescript"),
  node: ts.Node,
  fileWithPlaceholders: ts.SourceFile,
): Rendered {
  const mappings: CodeMapping[] = [];
  const writer = (ts as unknown as InternalTs).createTextWriter("\n");

  const printer = ts.createPrinter(
    {},
    {
      isEmitNotificationEnabled: () => true,
      onEmitNode(hint, emitted, emit) {
        const range = ts.getSourceMapRange(emitted);

        // `compileScriptNode` stamps a source range onto each renamed identifier;
        // only those get a mapping. An unstamped node reports its own pos/end
        // (`getSourceMapRange` returns the node itself), which we leave alone.
        const stamped = (range as ts.Node) !== emitted && range.end > range.pos;
        if (!stamped) {
          emit(hint, emitted);
          return;
        }

        const start = writer.getTextPos();
        emit(hint, emitted);
        const end = writer.getTextPos();

        mappings.push({
          sourceOffsets: [range.pos],
          generatedOffsets: [start],
          lengths: [range.end - range.pos],
          generatedLengths: [end - start],
          data: CODE_INFORMATION,
        });
      },
    },
  ) as InternalPrinter;

  printer.writeNode(
    ts.EmitHint.Unspecified,
    node,
    fileWithPlaceholders,
    writer,
  );

  return { code: writer.getText(), mappings };
}

// Appends `body.code[from, to)` and shifts the body mappings within that range
// to their new home in the output.
function appendBody(
  out: Builder,
  body: Rendered,
  from: number,
  to: number,
): void {
  if (to <= from) {
    return;
  }
  const shift = out.code.length - from;
  for (const m of body.mappings) {
    const offset = m.generatedOffsets[0];
    if (offset >= from && offset < to) {
      out.mappings.push({ ...m, generatedOffsets: [offset + shift] });
    }
  }
  out.code += body.code.slice(from, to);
}

// Client scripts, ordered by their position in the source file.
function sorted(
  sourceFile: ts.SourceFile,
  scripts: { [start: number]: ClientScript },
): ClientScript[] {
  return Object.values(scripts).sort(
    (a, b) =>
      a.sourceNode.getStart(sourceFile) - b.sourceNode.getStart(sourceFile),
  );
}
