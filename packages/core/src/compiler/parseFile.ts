import type ts from "typescript";
import type { SourceLocation } from "../cs-runtime/index.js";
import type { SourceRange } from "./SourceRange.js";

export interface ParsedFile {
  sourceFile: ts.SourceFile;
  scripts: ClientScript[];
}

export interface ClientScript {
  sourceFile: ts.SourceFile;
  sourceNode: ts.TaggedTemplateExpression;
  textWithPlaceholders: string;
  fileWithPlaceholders: ts.SourceFile;
  splices: { [placeholder: string]: Splice };

  toSourceLocation: (node: ts.Node) => SourceLocation;
  toSourceRange: (node: ts.Node) => SourceRange;
}

export interface Splice {
  sourceNode: ts.TemplateSpan;
  placeholder: string;
  scripts: ClientScript[];
}

export function parseSourceText(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): ParsedFile {
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
  );
  return parseSourceFile(ts, sourceFile);
}

export function parseSourceFile(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): ParsedFile {
  const scripts = getDirectScripts(ts, null, sourceFile);
  return { sourceFile, scripts };
}

function getDirectScripts(
  ts: typeof import("typescript"),
  parent: Splice | null,
  sourceFile: ts.SourceFile,
): ClientScript[] {
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

  const scripts: ClientScript[] = [];

  taggedTemplates.forEach((taggedTemplate) => {
    const splices = getDirectSplices(ts, taggedTemplate, sourceFile);
    const { textWithPlaceholders, mappings } = toTextWithPlaceholders(
      ts,
      taggedTemplate,
      sourceFile,
      splices,
    );
    const fileWithPlaceholders = ts.createSourceFile(
      sourceFile.fileName,
      textWithPlaceholders,
      ts.ScriptTarget.Latest,
    );
    const toSourceRange = (node: ts.Node): SourceRange => ({
      start: toSourceOffset(mappings, node.getStart(fileWithPlaceholders)),
      end: toSourceOffset(mappings, node.getEnd()),
    });
    const toSourceLocation = (node: ts.Node): SourceLocation => {
      const { start, end } = toSourceRange(node);
      return {
        path: sourceFile.fileName,
        start: sourceFile.getLineAndCharacterOfPosition(start),
        end: sourceFile.getLineAndCharacterOfPosition(end),
      };
    };
    scripts.push({
      sourceFile,
      sourceNode: taggedTemplate,
      textWithPlaceholders,
      fileWithPlaceholders,
      toSourceLocation,
      toSourceRange,
      splices,
    });
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
        scripts: [],
      };
      splices[placeholder] = splice;
      splice.scripts = getDirectScripts(ts, splice, sourceFile);
    });
  }

  return splices;
}

interface OffsetMapping {
  placeholderStart: number;
  length: number;
  sourceStart: number;
  verbatim: boolean;
}

function toTextWithPlaceholders(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
  splices: { [placeholder: string]: Splice },
): {
  textWithPlaceholders: string;
  mappings: OffsetMapping[];
} {
  const sourceText = sourceFile.text;
  const template = taggedTemplate.template;

  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `

  let textWithPlaceholders = "";
  const mappings: OffsetMapping[] = [];

  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    textWithPlaceholders = sourceText.slice(start, end);
    mappings.push({
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
      mappings.push({
        placeholderStart: textWithPlaceholders.length,
        length: chunk.length,
        sourceStart: chunkStart,
        verbatim: true,
      });
      textWithPlaceholders += chunk;
      mappings.push({
        placeholderStart: textWithPlaceholders.length,
        length: splice.placeholder.length,
        sourceStart: dollarBrace,
        verbatim: false,
      });
      textWithPlaceholders += splice.placeholder;
      chunkStart = span.literal.getStart(sourceFile) + 1; // past }
    });

    const tail = sourceText.slice(chunkStart, end);
    mappings.push({
      placeholderStart: textWithPlaceholders.length,
      length: tail.length,
      sourceStart: chunkStart,
      verbatim: true,
    });
    textWithPlaceholders += tail;
  }

  return { textWithPlaceholders, mappings };
}

function toSourceOffset(mappings: OffsetMapping[], pos: number): number {
  for (const mapping of mappings) {
    if (
      mapping.verbatim &&
      pos >= mapping.placeholderStart &&
      pos <= mapping.placeholderStart + mapping.length
    ) {
      return mapping.sourceStart + (pos - mapping.placeholderStart);
    }
  }
  for (const mapping of mappings) {
    if (
      !mapping.verbatim &&
      pos >= mapping.placeholderStart &&
      pos <= mapping.placeholderStart + mapping.length
    ) {
      return mapping.sourceStart;
    }
  }
  const last = mappings[mappings.length - 1];
  return last.sourceStart + last.length;
}
