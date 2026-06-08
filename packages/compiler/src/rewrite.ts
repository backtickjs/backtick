import type * as ts from "typescript";

export interface RewriteResult {
  virtualFile: ts.SourceFile;
  runtimeFile: ts.SourceFile;
  mappings: NodeMapping[];
}

export interface NodeMapping {
  sourceOffset: number;
  sourceLength: number;
  virtual: ts.Expression;
}

interface RewrittenNode {
  virtual: ts.Expression;
  runtime: ts.Expression;
}

/** State threaded through the rewrite of a single template. */
interface TemplateContext {
  sourceFile: ts.SourceFile;
  splices: ReadonlyMap<string, RewrittenNode>;
}

export default function rewrite(
  ts: typeof import("typescript"),
  filename: string,
  source: string,
): RewriteResult {
  const sourceFile = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  const ctx: TemplateContext = {
    sourceFile,
    splices: new Map(),
  };

  const mappings: NodeMapping[] = [];
  const virtualMapping = new Map<ts.Node, ts.Node>();
  const runtimeMapping = new Map<ts.Node, ts.Node>();

  const walk = (node: ts.Node): void => {
    if (
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node)
    ) {
      const rewritten = compileTemplate(ts, ctx, node);

      const sourceOffset = node.getStart(sourceFile);
      mappings.push({
        sourceOffset,
        sourceLength: node.getEnd() - sourceOffset,
        virtual: rewritten.virtual,
      });

      virtualMapping.set(node, rewritten.virtual);
      runtimeMapping.set(node, rewritten.runtime);
      return;
    }

    ts.forEachChild(node, walk);
  };

  walk(sourceFile);

  return {
    virtualFile: substitute(ts, sourceFile, virtualMapping),
    runtimeFile: substitute(ts, sourceFile, runtimeMapping),
    mappings,
  };
}

function compileTemplate(
  ts: typeof import("typescript"),
  ctx: TemplateContext,
  template: ts.NoSubstitutionTemplateLiteral | ts.TemplateExpression,
): RewrittenNode {
  let text: string;
  const splices = new Map<string, RewrittenNode>();

  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    text = template.text;
  } else {
    text = template.head.text;
    for (let i = 0; i < template.templateSpans.length; i++) {
      const span = template.templateSpans[i];
      const name = `$0splice${i}`;
      const inner = build(ts, ctx, span);
      splices.set(name, inner);
      text += name + span.literal.text;
    }
  }

  const parsed = ts.createSourceFile(
    ctx.sourceFile.fileName,
    text,
    ts.ScriptTarget.Latest,
    true,
  );

  if (
    parsed.statements.length !== 1 ||
    !ts.isExpressionStatement(parsed.statements[0])
  ) {
    throw "Expected syntax";
  }

  const statement = parsed.statements[0];
  return build(ts, ctx, statement.expression);
}

function build(
  ts: typeof import("typescript"),
  ctx: TemplateContext,
  node: ts.Node,
): RewrittenNode {
  const f = ts.factory;

  if (
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node)
  ) {
    return compileTemplate(ts, ctx, node);
  }

  if (ts.isTemplateSpan(node)) {
    const inner = build(ts, ctx, node.expression);
    return {
      virtual: inner.virtual,
      runtime: callV(ts, "visitSplice", [f.createNull(), inner.runtime]),
    };
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: f.createNumericLiteral(node.text),
      runtime: callV(ts, "visitNumber", [
        f.createNull(),
        f.createNumericLiteral(node.text),
      ]),
    };
  }

  if (ts.isIdentifier(node)) {
    const splice = ctx.splices.get(node.text);
    if (splice) {
      return splice;
    }
  }

  throw "Expected syntax";
}

function substitute(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  mapping: Map<ts.Node, ts.Node>,
): ts.SourceFile {
  const transformer =
    (context: ts.TransformationContext) => (root: ts.SourceFile) => {
      const visit = (node: ts.Node): ts.Node => {
        const replacement = mapping.get(node);
        if (replacement) {
          return replacement;
        }
        return ts.visitEachChild(node, visit, context);
      };
      return ts.visitNode(root, visit) as ts.SourceFile;
    };

  const result = ts.transform(sourceFile, [transformer]);
  return result.transformed[0];
}

function callV(
  ts: typeof import("typescript"),
  method: string,
  args: ts.Expression[],
): ts.Expression {
  const f = ts.factory;
  return f.createCallExpression(
    f.createPropertyAccessExpression(f.createIdentifier("v"), method),
    undefined,
    args,
  );
}
