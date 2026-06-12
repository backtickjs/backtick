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
  /**
   * The template body with every splice replaced by its placeholder, ready to
   * be parsed and formatted as a stand-alone TypeScript program. The client
   * dialect is syntactically TypeScript, so a tool can hand this straight to a
   * TypeScript parser; {@link Splice.placeholder} records what to swap back in.
   */
  parsed: string;
  splices: Map<ts.TemplateSpan, Splice>;
}

export interface Splice {
  index: number;
  parent: ClientScript;
  /**
   * The identifier substituted into {@link ClientScript.parsed} in place of
   * this splice's `${…}` hole. Keeping it a plain identifier means the body
   * stays parseable and the placeholder survives formatting as its own token.
   */
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
        parsed: "",
        splices: new Map(),
      };
      script.splices = collectSplices(taggedTemplate, sourceFile, script);
      script.parsed = renderBody(taggedTemplate, sourceFile, script);
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
 * for its placeholder. The raw source text between the backticks/holes is
 * copied verbatim so formatting sees exactly what the author wrote.
 */
function renderBody(
  taggedTemplate: ts.TaggedTemplateExpression,
  sourceFile: ts.SourceFile,
  script: ClientScript,
): string {
  const text = sourceFile.text;
  const template = taggedTemplate.template;

  // `+1` skips the leading `` ` `` or `}`; the trailing offset skips the
  // closing `` ` `` (1 char) or the `${` that opens the next hole (2 chars).
  const inner = (node: ts.Node, opensHole: boolean): string =>
    text.slice(node.getStart(sourceFile) + 1, node.getEnd() - (opensHole ? 2 : 1));

  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    return inner(template, false);
  }

  let body = inner(template.head, true);
  template.templateSpans.forEach((span) => {
    const splice = script.splices.get(span);
    body += (splice?.placeholder ?? "") + inner(span.literal, !isTail(span));
  });
  return body;
}

function isTail(span: ts.TemplateSpan): boolean {
  return span.literal.kind === ts.SyntaxKind.TemplateTail;
}

function placeholderFor(index: number): string {
  return `$cs${index}`;
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
