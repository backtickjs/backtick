import type * as ts from "typescript";

/** A source span, expressed as an absolute offset into the original file. */
export interface SourceSpan {
  start: number;
  length: number;
}

/** A piece of generated code, optionally mapped back to a source span. */
export interface MappedSegment {
  virtual: string;
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
 * The rewrite produces a real TypeScript expression built with `ts.factory`,
 * reusing the original identifier/literal nodes as the call arguments. Emitting
 * then walks that expression: the synthetic call heads are stringified with the
 * printer, while each reused identifier keeps its own source mapping. Only
 * identifiers carry a mapping; calls, punctuation, and literals are unmapped.
 */
export class Rewriter {
  private readonly ts: typeof import("typescript");
  private readonly printer: ts.Printer;
  private readonly printFile: ts.SourceFile;

  constructor(ts: typeof import("typescript")) {
    this.ts = ts;
    this.printer = ts.createPrinter();
    this.printFile = ts.createSourceFile(
      "print.tsx",
      "",
      ts.ScriptTarget.Latest,
    );
  }

  /**
   * Rewrites a backtick template into its mapped generated segments. Returns
   * `undefined` when the template body is not a single supported expression.
   */
  rewrite(
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ): RewrittenTemplate | undefined {
    const root = this.rewriteNode(template);
    return root && { segments: this.emit(root) };
  }

  /**
   * Rewrites a node into the lift/lower call expression. Leaves are returned
   * as-is, so this stays purely structural — positions are handled once, when
   * text is parsed (see `rewriteQuotedText`/`rebase`).
   */
  private rewriteNode(node: ts.Node): ts.Expression | undefined {
    const { ts } = this;

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      const body = this.rewriteQuotedText(node);
      return body && this.lift(body);
    }

    if (ts.isTemplateExpression(node)) {
      const body = this.rewriteTemplateBody(node);
      return body && this.lift(body);
    }

    if (ts.isIdentifier(node) || ts.isNumericLiteral(node)) {
      return node;
    }

    return undefined;
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

    const inner = this.rewriteNode(span.expression);
    return inner && this.lower(inner);
  }

  /**
   * Parses a backtick's literal text as an expression and rewrites it. The
   * parsed nodes live in a throwaway source file, so they are first rebased
   * into the original file's coordinates — the single place offsets are dealt
   * with.
   */
  private rewriteQuotedText(
    literal: ts.NoSubstitutionTemplateLiteral,
  ): ts.Expression | undefined {
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

  /** Wraps `argument` in a `Backtick.lift(...)` call. */
  private lift(argument: ts.Expression): ts.Expression {
    return this.call("lift", argument);
  }

  /** Wraps `argument` in a `Backtick.lower(...)` call. */
  private lower(argument: ts.Expression): ts.Expression {
    return this.call("lower", argument);
  }

  /** Builds a synthetic `Backtick.<method>(argument)` call expression. */
  private call(method: string, argument: ts.Expression): ts.CallExpression {
    const { factory } = this.ts;
    const callee = factory.createPropertyAccessExpression(
      factory.createIdentifier("Backtick"),
      method,
    );
    return factory.createCallExpression(callee, undefined, [argument]);
  }

  /** Walks the rewritten expression into mapped segments. */
  private emit(node: ts.Expression): MappedSegment[] {
    const { ts } = this;

    if (ts.isCallExpression(node)) {
      const head = this.print(node.expression);
      const [argument] = node.arguments;
      return [
        { virtual: `${head}(` },
        ...this.emit(argument),
        { virtual: ")" },
      ];
    }

    if (ts.isIdentifier(node)) {
      const source = { start: node.pos, length: node.end - node.pos };
      return [{ virtual: node.text, source }];
    }

    if (ts.isNumericLiteral(node)) {
      return [{ virtual: node.text }];
    }

    throw new Error(`Unexpected rewritten node: ${ts.SyntaxKind[node.kind]}`);
  }

  /** Stringifies a synthetic node (a call head) with the printer. */
  private print(node: ts.Node): string {
    return this.printer.printNode(
      this.ts.EmitHint.Unspecified,
      node,
      this.printFile,
    );
  }
}
