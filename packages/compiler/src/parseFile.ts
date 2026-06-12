import ts from "typescript";

export interface ParseOptions {
  fileName: string;
}

export interface ParseResult {
  sourceFile: ts.SourceFile;
  scripts: Map<ts.TaggedTemplateExpression, ClientScript>;
}

export interface ClientScript {
  index: number;
  parent: Splice | null;
  textWithPlaceholders: string;
  splices: Map<ts.TemplateSpan, Splice>;
}

export interface Splice {
  index: number;
  parent: ClientScript;
  placeholder: string;
  scripts: Map<ts.TaggedTemplateExpression, ClientScript>;
}

export function parseFile(source: string, options: ParseOptions): ParseResult {
  const fileName = options.fileName;
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    false,
    scriptKindFor(fileName),
  );

  return { sourceFile, scripts: collectScripts(sourceFile, sourceFile, null) };
}

function collectScripts(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  parent: Splice | null,
): Map<ts.TaggedTemplateExpression, ClientScript> {
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

  return new Map(
    taggedTemplates.map((taggedTemplate, index) => {
      const script: ClientScript = {
        index,
        parent,
        textWithPlaceholders: "",
        splices: new Map(),
      };
      script.splices = collectSplices(taggedTemplate, sourceFile, script);
      script.textWithPlaceholders = toTextWithPlaceholder(
        taggedTemplate,
        sourceFile,
        script,
      );
      return [taggedTemplate, script];
    }),
  );
}

function collectSplices(
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
  parent: ClientScript,
): Map<ts.TemplateSpan, Splice> {
  const splices = new Map<ts.TemplateSpan, Splice>();

  const template = taggedTemplate.template;
  if (ts.isTemplateExpression(template)) {
    template.templateSpans.forEach((span, index) => {
      const splice: Splice = {
        index,
        parent,
        placeholder: placeholderFor(index),
        scripts: new Map(),
      };
      splices.set(span, splice);
      splice.scripts = collectScripts(span.expression, sourceFile, splice);
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

  template.templateSpans.forEach((span) => {
    const splice = script.splices.get(span);
    const dollarBrace = span.expression.getFullStart() - 2; // before ${
    body += text.slice(chunkStart, dollarBrace) + (splice?.placeholder ?? "");
    chunkStart = span.literal.getStart(sourceFile) + 1; // past }
  });

  return body + text.slice(chunkStart, end);
}

function placeholderFor(index: number): string {
  return `$0splice${index}`;
}

const SCRIPT_KINDS = {
  ".tsx": ts.ScriptKind.TSX,
  ".jsx": ts.ScriptKind.JSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
};

function scriptKindFor(fileName: string): ts.ScriptKind {
  for (const [extension, kind] of Object.entries(SCRIPT_KINDS)) {
    if (fileName.endsWith(extension)) {
      return kind;
    }
  }
  return ts.ScriptKind.TS;
}
