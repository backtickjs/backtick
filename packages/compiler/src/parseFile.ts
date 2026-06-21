import type ts from "typescript";
import { scriptKindFor } from "./scriptKindFor.js";

export interface ParsedFile {
  sourceFile: ts.SourceFile;
  scripts: { [start: number]: ClientScript };
}

export interface ClientScript {
  node: ts.TaggedTemplateExpression;
  textWithPlaceholders: string;
  splices: { [placeholder: string]: Splice };
}

export interface Splice {
  node: ts.TemplateSpan;
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
  const node: ts.Node = parent ? parent.node.expression : sourceFile;
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
    const script: ClientScript = {
      node: taggedTemplate,
      textWithPlaceholders: "",
      splices: {},
    };
    script.splices = getDirectSplices(ts, script, sourceFile);
    script.textWithPlaceholders = toTextWithPlaceholder(
      ts,
      taggedTemplate,
      sourceFile,
      script,
    );
    scripts[taggedTemplate.getStart(sourceFile)] = script;
  });

  return scripts;
}

function getDirectSplices(
  ts: typeof import("typescript"),
  parent: ClientScript,
  sourceFile: ts.SourceFile,
): { [placeholder: string]: Splice } {
  const splices: { [placeholder: string]: Splice } = {};

  const template = parent.node.template;
  if (ts.isTemplateExpression(template)) {
    template.templateSpans.forEach((span, index) => {
      const placeholder = `$0splice${index}`;
      const splice: Splice = {
        node: span,
        placeholder,
        scripts: {},
      };
      splices[placeholder] = splice;
      splice.scripts = getDirectScripts(ts, splice, sourceFile);
    });
  }

  return splices;
}

/**
 * Stitch the template's literal chunks back together with each splice swapped
 * for its placeholder. The raw source text between the backticks/splices is
 * copied verbatim so formatting sees exactly what the author wrote.
 */
function toTextWithPlaceholder(
  ts: typeof import("typescript"),
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
  script: ClientScript,
): string {
  const text = sourceFile.text;
  const template = taggedTemplate.template;

  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `

  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    return text.slice(start, end);
  }

  let body = "";
  let chunkStart = start;

  template.templateSpans.forEach((span, index) => {
    const placeholder = `$0splice${index}`;
    const splice = script.splices[placeholder];
    const dollarBrace = span.expression.getFullStart() - 2; // before ${
    body += text.slice(chunkStart, dollarBrace) + splice.placeholder;
    chunkStart = span.literal.getStart(sourceFile) + 1; // past }
  });

  return body + text.slice(chunkStart, end);
}
