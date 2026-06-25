import type { CodeInformation, CodeMapping } from "@volar/language-core";
import type ts from "typescript";
import type { CompiledFile } from "./compileFile.js";
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

interface Rendered {
  virtualCode: string;
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
    this.code += part.virtualCode;
  }
}

export function printVirtualCode(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
  compiledFile: CompiledFile,
): Rendered {
  const { sourceFile } = parsedFile;
  const out = new Builder();

  let cursor = 0;
  for (const script of sorted(sourceFile, parsedFile.scripts)) {
    const start = script.sourceNode.getStart(sourceFile);
    out.verbatim(sourceFile.text, cursor, start - cursor);
    out.append(renderScript(ts, sourceFile, compiledFile, script));
    cursor = script.sourceNode.getEnd();
  }
  out.verbatim(sourceFile.text, cursor, sourceFile.text.length - cursor);

  return { virtualCode: out.code, mappings: out.mappings };
}

// Renders one script: print its compiled body, then replace each `$0splice<n>`
// placeholder with the corresponding host expression.
function renderScript(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiledFile: CompiledFile,
  script: ClientScript,
): Rendered {
  const node = compiledFile.scripts.get(script.sourceNode)?.virtual;
  if (!node) {
    return { virtualCode: "", mappings: [] };
  }

  const body = printBody(ts, node, script.fileWithPlaceholders);
  const out = new Builder();

  let cursor = 0;
  for (const match of body.virtualCode.matchAll(/\$0splice\d+/g)) {
    const at = match.index;
    if (at === undefined) {
      continue;
    }
    appendBody(out, body, cursor, at);
    out.append(
      renderSplice(ts, sourceFile, compiledFile, script.splices[match[0]]),
    );
    cursor = at + match[0].length;
  }
  appendBody(out, body, cursor, body.virtualCode.length);

  return { virtualCode: out.code, mappings: out.mappings };
}

// Renders a spliced host expression as verbatim source text, recursing into any
// nested `cs` scripts it contains.
function renderSplice(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  compiledFile: CompiledFile,
  splice: Splice,
): Rendered {
  const out = new Builder();
  const expression = splice.sourceNode.expression;
  const end = expression.getEnd();

  let cursor = expression.getStart(sourceFile);
  for (const nested of sorted(sourceFile, splice.scripts)) {
    const start = nested.sourceNode.getStart(sourceFile);
    out.verbatim(sourceFile.text, cursor, start - cursor);
    out.append(renderScript(ts, sourceFile, compiledFile, nested));
    cursor = nested.sourceNode.getEnd();
  }
  out.verbatim(sourceFile.text, cursor, end - cursor);

  return { virtualCode: out.code, mappings: out.mappings };
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

  return { virtualCode: writer.getText(), mappings };
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
  out.code += body.virtualCode.slice(from, to);
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
