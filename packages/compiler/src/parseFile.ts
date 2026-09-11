import type { SourceLocation } from "@backtickjs/client-script";
import type ts from "typescript";
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
// placeholder text as an identifier — the spelling that keys the splice
// dictionary and the runtime metadata (`key`) — and evaluate a host
// expression (`expression`).
//
// A component tag is the third: `<Card />` names a host binding too, and the
// source spelled no sigil for it. Which tags do is scope resolution's to say —
// a tag naming a binding in scope is a function the script holds — so these are
// not minted here but by the rewrite, once `resolveBindings` has answered.
export type Splice = BracedSplice | UnbracedSplice | ComponentTagSplice;

export interface BracedSplice {
  kind: "braced";
  // the template span's host expression
  expression: ts.Expression;
  // the metadata key — the `$0splice<n>` identifier standing in
  // `textWithPlaceholders`, which also keys the splice dictionary
  key: string;
  // client scripts nested in the host expression
  scripts: ClientScript[];
}

export interface UnbracedSplice {
  kind: "unbraced";
  // the host binding the shorthand names (synthesized, e.g. `x` for `$x`)
  expression: ts.Identifier;
  // the metadata key — the `$x` spelling the shorthand stands as in the
  // placeholder text, which also keys the splice dictionary
  key: string;
  // a shorthand names a single binding, so it nests no scripts
  scripts: [];
}

// The host binding a component tag names. It stands in no placeholder — a tag
// carries no sigil — so its key is minted rather than read from the text, and
// only for a tag no scope binds.
export interface ComponentTagSplice {
  kind: "component-tag";
  // the host binding the tag names (synthesized, e.g. `Card` for `<Card />`)
  expression: ts.Identifier;
  // the metadata key, `$<TagName>`: the same key `$Card` would mint, since it
  // is the same binding. One per component however many tags name it, because
  // a tag's props go with the call rather than with the value. A script that
  // writes both spellings claims the key twice, which minting has to answer.
  key: string;
  // a tag names a single binding, so it nests no scripts
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
    true,
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
    const { textWithPlaceholders, mappings } = toTextWithPlaceholders(
      ts,
      taggedTemplate,
      sourceFile,
    );
    const fileWithPlaceholders = ts.createSourceFile(
      sourceFile.fileName,
      textWithPlaceholders,
      ts.ScriptTarget.Latest,
      true,
    );
    // The dictionary's insertion order is evaluation order: emitted as the
    // script's metadata object literal, the splices' host expressions run
    // first to last when the `cs` expression itself evaluates — left to
    // right in source order, like a real template literal's spans.
    const splices = getDirectSplices(
      ts,
      taggedTemplate,
      sourceFile,
      fileWithPlaceholders,
    );
    const toSourceRange = (node: ts.Node): SourceRange => ({
      start: toSourceOffset(mappings, node.getStart(fileWithPlaceholders)),
      end: toSourceOffset(mappings, node.getEnd()),
    });
    const toSourceLocation = (node: ts.Node): SourceLocation => {
      const { start, end } = toSourceRange(node);
      const from = sourceFile.getLineAndCharacterOfPosition(start);
      const to = sourceFile.getLineAndCharacterOfPosition(end);
      return [from.line, from.character, to.line, to.character];
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

// A splice per first reference in the placeholder text, in source order: a
// `$0splice<n>` placeholder resolves to its template span's braced splice,
// and any other `$x` identifier mints an unbraced splice, deduplicated by
// spelling. A component tag mints one as well, under the `$Name` key that
// binding's shorthand would use. Property names and declaration names are not
// references (a `$`-prefixed declaration is rejected at rewrite time), and
// nested scripts are already placeholders in this text, so the walk scans only
// the script's own body.
function getDirectSplices(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
  fileWithPlaceholders: ts.SourceFile,
): { [placeholder: string]: Splice } {
  const splices: { [placeholder: string]: Splice } = {};

  const template = taggedTemplate.template;
  const spans = ts.isTemplateExpression(template) ? template.templateSpans : [];

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
      splices[node.text] == null
    ) {
      const key = node.text;
      if (key.startsWith("$0splice")) {
        // The numeric suffix indexes the template's spans. A `$0splice`
        // spelling that resolves to no span (`$0spliceFoo`, an out-of-range
        // index) is no splice at all — and no host binding either, since a
        // name can't start with `$0`.
        const index = Number(key.slice("$0splice".length));
        const span = spans[index];
        if (span != null) {
          const splice: BracedSplice = {
            kind: "braced",
            expression: span.expression,
            key,
            scripts: [],
          };
          splices[key] = splice;
          splice.scripts = getDirectScripts(ts, splice, sourceFile);
        }
      } else {
        splices[key] = {
          kind: "unbraced",
          expression: ts.factory.createIdentifier(key.slice(1)),
          key,
          scripts: [],
        };
      }
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

function toTextWithPlaceholders(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
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
