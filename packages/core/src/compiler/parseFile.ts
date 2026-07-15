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

// A host value read into a client script: braced — a `${...}` template
// span — or unbraced, the `$x` shorthand, sugar for splicing the host
// binding named without the sigil (`$x` reads as `${x}`). Both stand in the
// placeholder text as an identifier (`placeholder`) — the key the runtime
// metadata carries the value under — and evaluate a host expression
// (`expression`).
export type Splice = BracedSplice | UnbracedSplice;

export interface BracedSplice {
  kind: "braced";
  // the template span's host expression
  expression: ts.Expression;
  // the `$0splice<n>` identifier in `textWithPlaceholders`
  placeholder: string;
  // client scripts nested in the host expression
  scripts: ClientScript[];
}

export interface UnbracedSplice {
  kind: "unbraced";
  // the host binding the shorthand names (synthesized, e.g. `x` for `$x`)
  expression: ts.Identifier;
  // the `$x` itself: already an identifier, it stands for itself
  placeholder: string;
  // a shorthand names a single binding, so it nests no scripts
  scripts: [];
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
  const node: ts.Node = parent ? parent.expression : sourceFile;
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
    const { textWithPlaceholders, mappings, expressions } =
      toTextWithPlaceholders(ts, taggedTemplate, sourceFile);
    const fileWithPlaceholders = ts.createSourceFile(
      sourceFile.fileName,
      textWithPlaceholders,
      ts.ScriptTarget.Latest,
    );
    const splices = findSplices(
      ts,
      sourceFile,
      fileWithPlaceholders,
      expressions,
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

// A script's splices: one braced splice per `${...}` span — `expressions`
// maps each substituted placeholder to its span's host expression — plus an
// unbraced splice for every `$x` shorthand referenced in the placeholder
// text, deduplicated by spelling. Property names and declaration names are
// not references (a `$`-prefixed declaration is rejected at rewrite time),
// and nested scripts are already placeholders in this text, so the walk
// scans only the script's own body.
function findSplices(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  fileWithPlaceholders: ts.SourceFile,
  expressions: { [placeholder: string]: ts.Expression },
): { [placeholder: string]: Splice } {
  const splices: { [placeholder: string]: Splice } = {};

  for (const [placeholder, expression] of Object.entries(expressions)) {
    const splice: BracedSplice = {
      kind: "braced",
      expression,
      placeholder,
      scripts: [],
    };
    splices[placeholder] = splice;
    splice.scripts = getDirectScripts(ts, splice, sourceFile);
  }

  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) {
      visit(node.expression); // the name is not a reference
      return;
    }
    if (ts.isPropertyAssignment(node)) {
      if (ts.isComputedPropertyName(node.name)) {
        visit(node.name);
      }
      visit(node.initializer);
      return;
    }
    if (ts.isVariableDeclaration(node) || ts.isParameter(node)) {
      if (node.initializer) {
        visit(node.initializer);
      }
      return;
    }
    if (ts.isCatchClause(node)) {
      visit(node.block); // the catch binding is not a reference
      return;
    }
    if (
      ts.isIdentifier(node) &&
      node.text.startsWith("$") &&
      node.text.length > 1 &&
      splices[node.text] === undefined
    ) {
      splices[node.text] = {
        kind: "unbraced",
        expression: ts.factory.createIdentifier(node.text.slice(1)),
        placeholder: node.text,
        scripts: [],
      };
      return;
    }
    node.forEachChild(visit);
  };
  visit(fileWithPlaceholders);

  return splices;
}

interface OffsetMapping {
  placeholderStart: number;
  length: number;
  sourceStart: number;
  verbatim: boolean;
}

// Substitutes a `$0splice<n>` placeholder identifier for each `${...}` span
// so the template's contents parse as ordinary code, mapping every chunk
// back to its source offsets.
function toTextWithPlaceholders(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
): {
  textWithPlaceholders: string;
  mappings: OffsetMapping[];
  expressions: { [placeholder: string]: ts.Expression };
} {
  const sourceText = sourceFile.text;
  const template = taggedTemplate.template;

  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `

  let textWithPlaceholders = "";
  const mappings: OffsetMapping[] = [];
  const expressions: { [placeholder: string]: ts.Expression } = {};

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
      expressions[placeholder] = span.expression;
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
        length: placeholder.length,
        sourceStart: dollarBrace,
        verbatim: false,
      });
      textWithPlaceholders += placeholder;
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

  return { textWithPlaceholders, mappings, expressions };
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
