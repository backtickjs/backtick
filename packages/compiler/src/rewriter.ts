import type * as ts from "typescript";

/** A source span, expressed as an absolute offset into the original file. */
export interface SourceSpan {
  start: number;
  length: number;
}

/** A piece of generated code, optionally mapped back to a source span. */
export interface MappedSegment {
  generated: string;
  source?: SourceSpan;
}

/** The generated segments for a rewritten backtick template. */
export interface RewrittenTemplate {
  segments: MappedSegment[];
}

/**
 * Rewrites a backtick template into `Backtick.lift`/`Backtick.lower` calls:
 *
 *   `` `${`x`}` `` => Backtick.lift(Backtick.lower(Backtick.lift(x)))
 *
 * Only identifiers (variables, functions, etc.) carry a source mapping; the
 * generated calls, punctuation, and literals are emitted unmapped.
 */
export class Rewriter {
  private readonly ts: typeof import("typescript");

  constructor(ts: typeof import("typescript")) {
    this.ts = ts;
  }

  /**
   * Rewrites a backtick template into its mapped generated segments. Returns
   * `undefined` when the template body is not a single supported expression.
   */
  rewrite(
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ): RewrittenTemplate | undefined {
    const segments = this.rewriteNode(template, 0);
    if (!segments) return undefined;
    return { segments };
  }

  /**
   * Rewrites a node into mapped segments. `offset` is added to the node's start
   * to translate from its source file into the original file — it is `0` for
   * nodes from the original file and the content offset for expressions parsed
   * out of a backtick's text.
   */
  private rewriteNode(
    node: ts.Node,
    offset: number,
  ): MappedSegment[] | undefined {
    const { ts } = this;

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      const start = offset + node.pos;
      const body = this.rewriteQuotedText(node.text, start + 1);
      return body && this.lift(body);
    }

    if (ts.isTemplateExpression(node)) {
      const body = this.rewriteTemplateBody(node, offset);
      return body && this.lift(body);
    }

    if (ts.isIdentifier(node)) {
      const start = offset + node.pos;
      const length = node.end - node.pos;
      return [{ generated: node.text, source: { start, length } }];
    }

    if (ts.isNumericLiteral(node)) {
      return [{ generated: node.text }];
    }

    return undefined;
  }

  /**
   * Rewrites the body of a template that is a single `${...}` splice, lowering
   * the spliced expression. Returns `undefined` for unsupported shapes.
   */
  private rewriteTemplateBody(
    node: ts.TemplateExpression,
    offset: number,
  ): MappedSegment[] | undefined {
    if (node.head.text !== "" || node.templateSpans.length !== 1) {
      return undefined;
    }

    const [span] = node.templateSpans;
    if (span.literal.text !== "") return undefined;

    const inner = this.rewriteNode(span.expression, offset);
    return inner && this.lower(inner);
  }

  /** Parses a backtick's literal text as an expression and rewrites it. */
  private rewriteQuotedText(
    text: string,
    offset: number,
  ): MappedSegment[] | undefined {
    const expression = this.parse(text);
    if (!expression) return undefined;
    return this.rewriteNode(expression, offset);
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

  /** Wraps `body` in an unmapped `Backtick.lift(...)` call. */
  private lift(body: MappedSegment[]): MappedSegment[] {
    return this.call("lift", body);
  }

  /** Wraps `body` in an unmapped `Backtick.lower(...)` call. */
  private lower(body: MappedSegment[]): MappedSegment[] {
    return this.call("lower", body);
  }

  private call(method: string, body: MappedSegment[]): MappedSegment[] {
    return [
      { generated: `Backtick.${method}` },
      { generated: "(" },
      ...body,
      { generated: ")" },
    ];
  }
}
