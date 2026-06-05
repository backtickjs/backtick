import type * as ts from "typescript";

export interface RewriteResult {
  virtual: ts.Expression;
}

export class Rewriter {
  private readonly ts: typeof import("typescript");

  constructor(ts: typeof import("typescript")) {
    this.ts = ts;
  }

  rewrite(
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ): RewriteResult | undefined {
    return this.rewriteNode(template);
  }

  private rewriteNode(node: ts.Node): RewriteResult | undefined {
    const { ts } = this;

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      const body = this.rewriteQuotedText(node);
      return body && this.call("lift", body);
    }

    if (ts.isTemplateExpression(node)) {
      const body = this.rewriteTemplateBody(node);
      return body && this.call("lift", body);
    }

    if (ts.isIdentifier(node) || ts.isNumericLiteral(node)) {
      return { virtual: node };
    }

    return undefined;
  }

  /**
   * Rewrites the body of a template that is a single `${...}` splice, lowering
   * the spliced expression. Returns `undefined` for unsupported shapes.
   */
  private rewriteTemplateBody(
    node: ts.TemplateExpression,
  ): RewriteResult | undefined {
    if (node.head.text !== "" || node.templateSpans.length !== 1) {
      return undefined;
    }

    const [span] = node.templateSpans;
    if (span.literal.text !== "") return undefined;

    const inner = this.rewriteNode(span.expression);
    return inner && this.call("lower", inner);
  }

  /**
   * Parses a backtick's literal text as an expression and rewrites it. The
   * parsed nodes live in a throwaway source file, so they are first rebased
   * into the original file's coordinates — the single place offsets are dealt
   * with.
   */
  private rewriteQuotedText(
    literal: ts.NoSubstitutionTemplateLiteral,
  ): RewriteResult | undefined {
    const expression = this.parse(literal.text);
    if (!expression) return undefined;
    this.rebase(expression, literal.pos + 1);
    return this.rewriteNode(expression);
  }

  /** Parses `text` as a single expression, or returns `undefined`. */
  private parse(text: string): ts.Expression | undefined {
    const { ts } = this;
    const expression = ts.createSourceFile(
      "backtick.tsx",
      text,
      ts.ScriptTarget.Latest,
      false, // perf optimization: node.parent left unset
      ts.ScriptKind.TSX,
    );

    const [statement] = expression.statements;
    if (
      expression.statements.length !== 1 ||
      !ts.isExpressionStatement(statement)
    ) {
      return undefined;
    }
    return statement.expression;
  }

  /** Shifts a parsed subtree's positions into the original file's coordinates. */
  private rebase(node: ts.Node, offset: number): void {
    const { ts } = this;
    ts.setTextRange(node, { pos: node.pos + offset, end: node.end + offset });
    node.forEachChild((child) => this.rebase(child, offset));
  }

  /** Builds a synthetic `Backtick.<method>(argument)` call. */
  private call(method: string, argument: RewriteResult): RewriteResult {
    const { factory } = this.ts;
    const callee = factory.createPropertyAccessExpression(
      factory.createIdentifier("Backtick"),
      method,
    );
    const virtual = factory.createCallExpression(callee, undefined, [
      argument.virtual,
    ]);
    return { virtual };
  }
}
