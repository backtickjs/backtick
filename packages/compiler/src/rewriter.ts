import type * as ts from "typescript";

/** Printed virtual (and runtime) forms of a rewritten backtick template. */
export interface RewrittenTemplate {
  virtual: string;
}

/**
 * Rewrites a parsed backtick expression into its virtual and runtime
 * forms in a single traversal.
 *
 * A backtick template is `Backtick.lift`ed and each `${...}` splice within it
 * is `Backtick.lower`ed, so `` `${`1`}` `` becomes
 * `Backtick.lift(Backtick.lower(Backtick.lift(1)))`.
 */
export class Rewriter {
  private readonly ts: typeof import("typescript");
  private readonly context: ts.TransformationContext;
  private readonly printer: ts.Printer;
  private expressionSourceFile: ts.SourceFile;

  constructor(ts: typeof import("typescript")) {
    this.ts = ts;
    this.context = captureTransformationContext(ts);
    this.printer = ts.createPrinter();
    this.expressionSourceFile = ts.createSourceFile(
      "expression.tsx",
      "",
      ts.ScriptTarget.Latest,
      true, // keep parent pointers so node.getStart()/getSourceFile() work
      ts.ScriptKind.TSX,
    );
  }

  /**
   * Rewrites a backtick template into its virtual (and runtime) forms. Returns
   * `undefined` when the template body is not a single expression.
   */
  rewrite(
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
    _sourceFile: ts.SourceFile,
  ): RewrittenTemplate | undefined {
    const virtual = this.rewriteNode(template);
    if (!virtual) return undefined;
    return { virtual: this.print(virtual) };
  }

  /** Rewrites any node, lifting templates and lowering their splices. */
  private rewriteNode(node: ts.Node): ts.Expression | undefined {
    const { ts } = this;

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      const body = this.rewriteQuotedText(node.text);
      return body && this.lift(body);
    }

    if (ts.isTemplateExpression(node)) {
      const body = this.rewriteTemplateBody(node);
      return body && this.lift(body);
    }

    if (ts.isNumericLiteral(node)) {
      return ts.factory.createNumericLiteral(node.text);
    }

    return this.rewriteChildren(node);
  }

  /** Parses a backtick's literal text as an expression and rewrites it. */
  private rewriteQuotedText(text: string): ts.Expression | undefined {
    const expression = this.parse(text);
    if (!expression) return undefined;
    return this.rewriteNode(expression);
  }

  /**
   * Rewrites the body of a template that is a single `${...}` splice, lowering
   * the spliced expression. Returns `undefined` for unsupported shapes.
   */
  private rewriteTemplateBody(
    node: ts.TemplateExpression,
  ): ts.Expression | undefined {
    if (node.head.text !== "" || node.templateSpans.length !== 1) {
      return undefined;
    }

    const [span] = node.templateSpans;
    if (span.literal.text !== "") return undefined;

    const spliced = this.rewriteNode(span.expression);
    return spliced && this.lower(spliced);
  }

  /** Parses `text` as a single expression, or returns `undefined`. */
  private parse(text: string): ts.Expression | undefined {
    const { ts } = this;
    this.expressionSourceFile = ts.updateSourceFile(
      this.expressionSourceFile,
      text,
      ts.createTextChangeRange(
        ts.createTextSpan(0, this.expressionSourceFile.text.length),
        text.length,
      ),
    );

    const [statement] = this.expressionSourceFile.statements;
    if (
      this.expressionSourceFile.statements.length !== 1 ||
      !ts.isExpressionStatement(statement)
    ) {
      return undefined;
    }
    return statement.expression;
  }

  private print(node: ts.Node): string {
    return this.printer.printNode(
      this.ts.EmitHint.Unspecified,
      node,
      this.expressionSourceFile,
    );
  }

  private rewriteChildren(node: ts.Node): ts.Expression {
    const { ts, context } = this;
    return ts.visitEachChild(
      node,
      (child) => this.rewriteNode(child) ?? child,
      context,
    ) as ts.Expression;
  }

  /** Wraps `arg` in `Backtick.lift(...)`. */
  private lift(arg: ts.Expression): ts.Expression {
    return this.callBacktick("lift", arg);
  }

  /** Wraps `arg` in `Backtick.lower(...)`. */
  private lower(arg: ts.Expression): ts.Expression {
    return this.callBacktick("lower", arg);
  }

  private callBacktick(method: string, arg: ts.Expression): ts.Expression {
    const { factory } = this.ts;
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("Backtick"),
        method,
      ),
      undefined,
      [arg],
    );
  }
}

function captureTransformationContext(
  ts: typeof import("typescript"),
): ts.TransformationContext {
  let captured: ts.TransformationContext | undefined;
  const dummy = ts.createSourceFile("ctx.ts", "", ts.ScriptTarget.Latest);
  ts.transform(dummy, [
    (context) => {
      captured = context;
      return (node) => node;
    },
  ]).dispose();
  return captured!;
}
