import type * as ts from "typescript";

/** Result of rewriting a single backtick expression node. */
export interface RewriteResult {
  virtual: ts.Node;
}

/** Printed virtual (and runtime) forms of a rewritten backtick template. */
export interface RewrittenTemplate {
  virtual: string;
}

/**
 * Rewrites a parsed backtick expression into its virtual and runtime
 * forms in a single traversal.
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
   * Parses a backtick template's inner expression and rewrites it into its
   * virtual (and runtime) forms. Returns `undefined` when the template body is
   * not a single expression.
   */
  rewrite(
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
    sourceFile: ts.SourceFile,
  ): RewrittenTemplate | undefined {
    const expression = this.parse(template, sourceFile);
    if (!expression) return undefined;

    const { virtual } = this.rewriteExpr(expression);
    return { virtual: this.print(virtual) };
  }

  private parse(
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
    sourceFile: ts.SourceFile,
  ): ts.Expression | undefined {
    const { ts } = this;
    const content = template.getText(sourceFile).slice(1, -1);
    this.expressionSourceFile = ts.updateSourceFile(
      this.expressionSourceFile,
      content,
      ts.createTextChangeRange(
        ts.createTextSpan(0, this.expressionSourceFile.text.length),
        content.length,
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

  private rewriteExpr(node: ts.Node): RewriteResult {
    if (this.ts.isNumericLiteral(node) && node.text === "1") {
      return {
        virtual: this.iife(this.ts.factory.createNumericLiteral(node.text)),
      };
    }

    return this.rewriteChildren(node);
  }

  private rewriteChildren(node: ts.Node): RewriteResult {
    const { ts, context } = this;

    const virtual = ts.visitEachChild(
      node,
      (child) => this.rewriteExpr(child).virtual,
      context,
    );

    return { virtual };
  }

  private iife(expr: ts.Expression): ts.Expression {
    const arrow = this.ts.factory.createArrowFunction(
      undefined,
      undefined,
      [],
      undefined,
      undefined,
      expr,
    );
    return this.ts.factory.createCallExpression(
      this.ts.factory.createParenthesizedExpression(arrow),
      undefined,
      [],
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
