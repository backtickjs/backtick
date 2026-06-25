import type ts from "typescript";
import type { SourceLocation } from "../cs-runtime/index.js";
import { scriptKindFor } from "./scriptKindFor.js";

export interface ParsedFile {
  sourceFile: ts.SourceFile;
  scripts: { [start: number]: ClientScript };
}

export interface ClientScript {
  sourceNode: ts.TaggedTemplateExpression;
  sourceFile: ts.SourceFile;
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
    const { text: textWithPlaceholders, resolveLocation } =
      toTextWithPlaceholders(ts, taggedTemplate, sourceFile, splices);
    const fileWithPlaceholders = ts.createSourceFile(
      sourceFile.fileName,
      textWithPlaceholders,
      ts.ScriptTarget.Latest,
      false,
      scriptKindFor(ts, sourceFile.fileName),
    );
    const mapPosition = (node: ts.Node): SourceLocation =>
      resolveLocation(node.getStart(fileWithPlaceholders), node.getEnd());
    scripts[start] = {
      sourceNode: taggedTemplate,
      sourceFile,
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

interface TextWithPlaceholders {
  text: string;
  // `SourceLocation` in the original `sourceFile`.
  resolveLocation: (start: number, end: number) => SourceLocation;
}

// A run of the stitched text that maps back to the original source. Verbatim
// chunks are copied char-for-char, so they map linearly; placeholder tokens
// collapse a whole `${...}` span, so every offset inside one maps to the span's
// start in the original.
interface Segment {
  placeholderStart: number;
  length: number;
  originalStart: number;
  verbatim: boolean;
}

function makeResolveLocation(
  sourceFile: ts.SourceFile,
  segments: Segment[],
  fallback: number,
): (start: number, end: number) => SourceLocation {
  const toOriginalOffset = (pos: number): number => {
    for (const segment of segments) {
      if (
        segment.verbatim &&
        pos >= segment.placeholderStart &&
        pos <= segment.placeholderStart + segment.length
      ) {
        return segment.originalStart + (pos - segment.placeholderStart);
      }
    }
    for (const segment of segments) {
      if (
        !segment.verbatim &&
        pos >= segment.placeholderStart &&
        pos <= segment.placeholderStart + segment.length
      ) {
        return segment.originalStart;
      }
    }
    return fallback;
  };

  return (start, end) => ({
    start: sourceFile.getLineAndCharacterOfPosition(toOriginalOffset(start)),
    end: sourceFile.getLineAndCharacterOfPosition(toOriginalOffset(end)),
  });
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
): TextWithPlaceholders {
  const text = sourceFile.text;
  const template = taggedTemplate.template;

  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `

  const segments: Segment[] = [];

  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    const body = text.slice(start, end);
    segments.push({
      placeholderStart: 0,
      length: body.length,
      originalStart: start,
      verbatim: true,
    });
    return {
      text: body,
      resolveLocation: makeResolveLocation(sourceFile, segments, end),
    };
  }

  let body = "";
  let chunkStart = start;

  template.templateSpans.forEach((span, index) => {
    const placeholder = `$0splice${index}`;
    const splice = splices[placeholder];
    const dollarBrace = span.expression.getFullStart() - 2; // before ${
    const chunk = text.slice(chunkStart, dollarBrace);
    segments.push({
      placeholderStart: body.length,
      length: chunk.length,
      originalStart: chunkStart,
      verbatim: true,
    });
    body += chunk;
    segments.push({
      placeholderStart: body.length,
      length: splice.placeholder.length,
      originalStart: dollarBrace,
      verbatim: false,
    });
    body += splice.placeholder;
    chunkStart = span.literal.getStart(sourceFile) + 1; // past }
  });

  const tail = text.slice(chunkStart, end);
  segments.push({
    placeholderStart: body.length,
    length: tail.length,
    originalStart: chunkStart,
    verbatim: true,
  });
  body += tail;

  return {
    text: body,
    resolveLocation: makeResolveLocation(sourceFile, segments, end),
  };
}
