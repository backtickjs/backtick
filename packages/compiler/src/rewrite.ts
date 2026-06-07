import type * as ts from "typescript";
import { type CompilerResult, emit } from "./emit.js";

export type { CompilerResult };

interface CompilationContext {
  inTemplate: boolean;
  virtualMapping: Map<ts.Node, ts.Node>;
  runtimeMapping: Map<ts.Node, ts.Node>;
}

export default function compile(
  ts: typeof import("typescript"),
  filename: string,
  source: string,
): CompilerResult {
  const sourceFile = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  const ctx: CompilationContext = {
    inTemplate: false,
    virtualMapping: new Map(),
    runtimeMapping: new Map(),
  };

  processNode(ts, sourceFile, sourceFile, ctx);

  const virtualFile = substitute(ts, sourceFile, ctx.virtualMapping);
  const runtimeFile = substitute(ts, sourceFile, ctx.runtimeMapping);

  return emit(ts, sourceFile, virtualFile, runtimeFile, ctx.virtualMapping);
}

/** Replaces mapped nodes throughout `sourceFile`, returning a new file. */
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

function processNode(
  ts: typeof import("typescript"),
  node: ts.Node,
  sourceFile: ts.SourceFile,
  ctx: CompilationContext,
): void {
  if (
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node)
  ) {
    let text: string;

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      text = node.text;
    } else {
      text = node.head.text;
      for (let i = 0; i < node.templateSpans.length; i++) {
        const span = node.templateSpans[i];
        const placeholder = `$0splice${i}`;
        text += placeholder + span.literal.text;
      }
    }

    const parsed = ts.createSourceFile(
      sourceFile.fileName,
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

    ctx.inTemplate = true;
    const statement = parsed.statements[0];
    const rewritten = rewrite(ts, statement.expression);
    ctx.inTemplate = false;

    ctx.virtualMapping.set(node, rewritten.virtual);
    ctx.runtimeMapping.set(node, rewritten.runtime);

    return;
  }

  ts.forEachChild(node, (child) => processNode(ts, child, sourceFile, ctx));
}

interface RewriteResult {
  virtual: ts.Node;
  runtime: ts.Node;
}

function rewrite(
  ts: typeof import("typescript"),
  node: ts.Node,
): RewriteResult {
  const f = ts.factory;

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: f.createNumericLiteral(node.text),
      runtime: v(ts, "visitNumber", [
        f.createNull(),
        f.createNumericLiteral(node.text),
      ]),
    };
  }

  throw "Expected syntax";
}

/** Builds a synthetic `v.<method>(...args)` visitor call. */
function v(
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
