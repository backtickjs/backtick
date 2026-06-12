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
  splices: Map<ts.TemplateSpan, Splice>;
}

export interface Splice {
  index: number;
  parent: ClientScript;
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

  return { sourceFile, scripts: collectScripts(sourceFile, null) };
}

function collectScripts(
  node: ts.Node,
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
      const script: ClientScript = { index, parent, splices: new Map() };
      script.splices = collectSplices(taggedTemplate, script);
      return [taggedTemplate, script];
    }),
  );
}

function collectSplices(
  taggedTemplate: ts.TaggedTemplateExpression,
  parent: ClientScript,
): Map<ts.TemplateSpan, Splice> {
  const splices = new Map<ts.TemplateSpan, Splice>();

  const template = taggedTemplate.template;
  if (ts.isTemplateExpression(template)) {
    template.templateSpans.forEach((span, index) => {
      const splice: Splice = {
        index,
        parent,
        scripts: new Map(),
      };
      splices.set(span, splice);
      splice.scripts = collectScripts(span.expression, splice);
    });
  }

  return splices;
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
