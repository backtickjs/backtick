import ts from "typescript";

export interface ParseOptions {
  fileName: string;
}

export interface ParseResult {
  sourceFile: ts.SourceFile;
  allScripts: ClientScript[];
}

export interface ClientScript {
  node: ts.TaggedTemplateExpression;
  textWithPlaceholders: string;
  splices: Map<ts.TemplateSpan, Splice>;
}

export interface Splice {
  node: ts.TemplateSpan;
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

  const rootScripts = getDirectScripts(null, sourceFile);
  return { sourceFile, allScripts: flatten(rootScripts, []) };
}

function flatten(
  scripts: Map<ts.TaggedTemplateExpression, ClientScript>,
  into: ClientScript[],
): ClientScript[] {
  for (const script of scripts.values()) {
    into.push(script);
    for (const splice of script.splices.values()) {
      flatten(splice.scripts, into);
    }
  }
  return into;
}

function getDirectScripts(
  parent: Splice | null,
  sourceFile: ts.SourceFile,
): Map<ts.TaggedTemplateExpression, ClientScript> {
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

  return new Map(
    taggedTemplates.map((taggedTemplate) => {
      const script: ClientScript = {
        node: taggedTemplate,
        textWithPlaceholders: "",
        splices: new Map(),
      };
      script.splices = getDirectSplices(script, sourceFile);
      script.textWithPlaceholders = toTextWithPlaceholder(
        taggedTemplate,
        sourceFile,
        script,
      );
      return [taggedTemplate, script];
    }),
  );
}

function getDirectSplices(
  parent: ClientScript,
  sourceFile: ts.SourceFile,
): Map<ts.TemplateSpan, Splice> {
  const splices = new Map<ts.TemplateSpan, Splice>();

  const template = parent.node.template;
  if (ts.isTemplateExpression(template)) {
    template.templateSpans.forEach((span, index) => {
      const splice: Splice = {
        node: span,
        placeholder: `$0splice${index}`,
        scripts: new Map(),
      };
      splices.set(span, splice);
      splice.scripts = getDirectScripts(splice, sourceFile);
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
