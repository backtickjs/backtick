import type ts from "typescript";
import type { SourceLocation } from "../cs-runtime/index.js";
import { scriptKindFor } from "./scriptKindFor.js";

export interface ParsedFile {
  sourceFile: ts.SourceFile;
  scripts: { [start: number]: ClientScript };
}

export interface ClientScript {
  sourceNode: ts.TaggedTemplateExpression;
  textWithPlaceholders: string;
  fileWithPlaceholders: ts.SourceFile;
  // Maps a node in `fileWithPlaceholders` to a `SourceLocation` in the `sourceFile`.
  mapPosition: (node: ts.Node) => SourceLocation;
  splices: { [placeholder: string]: Splice };
}

export interface Splice {
  sourceNode: ts.TemplateSpan;
  placeholder: string;
  scripts: { [start: number]: ClientScript };
}

export function parseFile(
  ts: typeof import("typescript"),
  fileName: string,
  sourceText: string,
): ParsedFile {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(ts, fileName),
  );

  const scripts = getDirectScripts(ts, null, sourceFile);
  return { sourceFile, scripts };
}

function getDirectScripts(
  ts: typeof import("typescript"),
  parent: Splice | null,
  sourceFile: ts.SourceFile,
): { [start: number]: ClientScript } {
  const node: ts.Node = parent ? parent.sourceNode.expression : sourceFile;
  const taggedTemplates: ts.TaggedTemplateExpression[] = [];

  const visit = (current: ts.Node): void => {
    if (
      ts.isTaggedTemplateExpression(current) &&
      ts.isIdentifier(current.tag) &&
      current.tag.text === "cs"
    ) {
      taggedTemplates.push(current);
    } else {
      current.forEachChild(visit);
    }
  };
  visit(node);

  const scripts: { [start: number]: ClientScript } = {};

  taggedTemplates.forEach((taggedTemplate) => {
    const start = taggedTemplate.getStart(sourceFile);
    const splices = getDirectSplices(ts, taggedTemplate, sourceFile);
    const { textWithPlaceholders, segments } = toTextWithPlaceholders(
      ts,
      taggedTemplate,
      sourceFile,
      splices,
    );
    const fileWithPlaceholders = ts.createSourceFile(
      sourceFile.fileName,
      textWithPlaceholders,
      ts.ScriptTarget.Latest,
      false,
      scriptKindFor(ts, sourceFile.fileName),
    );
    const mapPosition = (node: ts.Node): SourceLocation => ({
      start: sourceFile.getLineAndCharacterOfPosition(
        toSourceOffset(segments, node.getStart(fileWithPlaceholders)),
      ),
      end: sourceFile.getLineAndCharacterOfPosition(
        toSourceOffset(segments, node.getEnd()),
      ),
    });
    scripts[start] = {
      sourceNode: taggedTemplate,
      textWithPlaceholders,
      fileWithPlaceholders,
      mapPosition,
      splices,
    };
  });

  return scripts;
}

function getDirectSplices(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
): { [placeholder: string]: Splice } {
  const splices: { [placeholder: string]: Splice } = {};

  const template = taggedTemplate.template;
  if (ts.isTemplateExpression(template)) {
    template.templateSpans.forEach((span, index) => {
      const placeholder = `$0splice${index}`;
      const splice: Splice = {
        sourceNode: span,
        placeholder,
        scripts: {},
      };
      splices[placeholder] = splice;
      splice.scripts = getDirectScripts(ts, splice, sourceFile);
    });
  }

  return splices;
}

// A run of the stitched text that maps back to the original source. Verbatim
// chunks are copied char-for-char, so they map linearly; placeholder tokens
// collapse a whole `${...}` span, so every offset inside one maps to the span's
// start in the original.
interface Segment {
  placeholderStart: number;
  length: number;
  sourceStart: number;
  verbatim: boolean;
}

/**
 * Stitch the template's literal chunks back together with each splice swapped
 * for its placeholder. The raw source text between the backticks/splices is
 * copied verbatim so formatting sees exactly what the author wrote. Also build
 * a map from offsets in the stitched text back to the original source so the
 * compiler can report locations in the file the author actually wrote.
 */
function toTextWithPlaceholders(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
  splices: { [placeholder: string]: Splice },
): {
  textWithPlaceholders: string;
  segments: Segment[];
} {
  const sourceText = sourceFile.text;
  const template = taggedTemplate.template;

  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `

  let textWithPlaceholders = "";
  const segments: Segment[] = [];

  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    textWithPlaceholders = sourceText.slice(start, end);
    segments.push({
      placeholderStart: 0,
      length: textWithPlaceholders.length,
      sourceStart: start,
      verbatim: true,
    });
  } else {
    let chunkStart = start;

    template.templateSpans.forEach((span, index) => {
      const placeholder = `$0splice${index}`;
      const splice = splices[placeholder];
      const dollarBrace = span.expression.getFullStart() - 2; // before ${
      const chunk = sourceText.slice(chunkStart, dollarBrace);
      segments.push({
        placeholderStart: textWithPlaceholders.length,
        length: chunk.length,
        sourceStart: chunkStart,
        verbatim: true,
      });
      textWithPlaceholders += chunk;
      segments.push({
        placeholderStart: textWithPlaceholders.length,
        length: splice.placeholder.length,
        sourceStart: dollarBrace,
        verbatim: false,
      });
      textWithPlaceholders += splice.placeholder;
      chunkStart = span.literal.getStart(sourceFile) + 1; // past }
    });

    const tail = sourceText.slice(chunkStart, end);
    segments.push({
      placeholderStart: textWithPlaceholders.length,
      length: tail.length,
      sourceStart: chunkStart,
      verbatim: true,
    });
    textWithPlaceholders += tail;
  }

  return { textWithPlaceholders, segments };
}

function toSourceOffset(segments: Segment[], pos: number): number {
  for (const segment of segments) {
    if (
      segment.verbatim &&
      pos >= segment.placeholderStart &&
      pos <= segment.placeholderStart + segment.length
    ) {
      return segment.sourceStart + (pos - segment.placeholderStart);
    }
  }
  for (const segment of segments) {
    if (
      !segment.verbatim &&
      pos >= segment.placeholderStart &&
      pos <= segment.placeholderStart + segment.length
    ) {
      return segment.sourceStart;
    }
  }
  const last = segments[segments.length - 1];
  return last.sourceStart + last.length;
}
