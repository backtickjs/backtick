import type * as ts from "typescript";

export interface RewriteResult {
  /** Type/language-service view: a `Backtick.lift`/`lower` expression. */
  virtual: ts.Expression;
  /** Executable view: visitor calls, wrapped at the root in a `Backtick.make` IIFE. */
  runtime: ts.Expression;
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

  /**
   * Rewrites a node of *quoted* code into its virtual and runtime forms. When
   * `splices` is given the node is a template's parsed skeleton, so a bare
   * identifier must resolve to one of the splices rather than passing through as
   * a free variable. Free variables (outside the skeleton) are collected into
   * `freeVars` for the runtime metadata.
   */
  private rewriteNode(
    node: ts.Node,
    splices?: ReadonlyMap<string, RewriteResult>,
    freeVars?: Set<string>,
  ): RewriteResult | undefined {
    const { ts } = this;
    const { factory } = ts;

    if (
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node)
    ) {
      return this.rewriteTemplate(node);
    }

    if (ts.isBinaryExpression(node)) {
      const left = this.rewriteNode(node.left, splices, freeVars);
      const right = this.rewriteNode(node.right, splices, freeVars);
      if (!left || !right) return undefined;
      const operator = ts.tokenToString(node.operatorToken.kind) ?? "";
      return {
        virtual: factory.createBinaryExpression(
          left.virtual,
          node.operatorToken,
          right.virtual,
        ),
        runtime: this.visit("visitBinary", [
          factory.createNull(),
          left.runtime,
          factory.createStringLiteral(operator),
          right.runtime,
        ]),
      };
    }

    if (ts.isIdentifier(node)) {
      if (splices) return splices.get(node.text);
      freeVars?.add(node.text);
      return {
        virtual: node,
        runtime: this.visit("visitIdentifier", [
          factory.createNull(),
          factory.createStringLiteral(node.text),
        ]),
      };
    }

    if (ts.isNumericLiteral(node)) {
      return {
        virtual: node,
        runtime: this.visit("visitNumber", [
          factory.createNull(),
          factory.createNumericLiteral(node.text),
        ]),
      };
    }

    return undefined;
  }

  /**
   * Rewrites a whole backtick. Each `${...}` splice is hoisted into a `const` so
   * it is evaluated once and referenced by name; the literal text — with those
   * names standing in for the splices — is then parsed so its operators tie the
   * splices together. The result is the type-side `Backtick.lift`/`lower`
   * expression plus a runtime `Backtick.make` IIFE, e.g. `${x} + ${y}`:
   *
   *   virtual: Backtick.lift(Backtick.lower(x) + Backtick.lower(y))
   *   runtime: (() => {
   *     const __splice0__ = x;
   *     const __splice1__ = y;
   *     return Backtick.make(
   *       (v) => v.visitBacktick(null, meta, <body>),
   *       () => Backtick.lower(x) + Backtick.lower(y),
   *     );
   *   })()
   */
  private rewriteTemplate(
    node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ): RewriteResult | undefined {
    const { ts } = this;
    const { factory } = ts;

    const splices = new Map<string, RewriteResult>();
    const spliceDecls: ts.Statement[] = [];
    const spliceMeta: ts.PropertyAssignment[] = [];
    const freeVars = new Set<string>();

    let text: string;
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      text = node.text;
    } else {
      text = node.head.text;
      for (const [i, span] of node.templateSpans.entries()) {
        const splice = this.rewriteSplice(span.expression);
        if (!splice) return undefined;

        const name = `__splice${i}__`;
        splices.set(name, {
          virtual: this.backtick("lower", splice.virtual),
          runtime: this.visit("visitSplice", [
            factory.createNull(),
            factory.createStringLiteral(name),
            factory.createIdentifier(name),
          ]),
        });
        spliceDecls.push(this.constDeclaration(name, splice.runtime));
        spliceMeta.push(
          factory.createPropertyAssignment(
            name,
            factory.createIdentifier(name),
          ),
        );
        text += name + span.literal.text;
      }
    }

    const skeleton = this.parse(text, node.pos + 1);
    if (!skeleton) return undefined;
    const body = this.rewriteNode(
      skeleton,
      ts.isTemplateExpression(node) ? splices : undefined,
      freeVars,
    );
    if (!body) return undefined;

    return {
      virtual: this.backtick("lift", body.virtual),
      runtime: this.iife(spliceDecls, spliceMeta, freeVars, body),
    };
  }

  /**
   * Resolves a `${...}` splice. A splice that is itself a backtick is compiled
   * recursively. Otherwise the expression is ordinary code: it stays verbatim as
   * its type (`compileBacktick` maps it back to source), while its runtime form
   * has any backtick nested within it replaced by that backtick's IIFE.
   */
  private rewriteSplice(expression: ts.Expression): RewriteResult | undefined {
    const { ts } = this;
    if (
      ts.isNoSubstitutionTemplateLiteral(expression) ||
      ts.isTemplateExpression(expression)
    ) {
      return this.rewriteTemplate(expression);
    }
    return { virtual: expression, runtime: this.spliceRuntime(expression) };
  }

  /**
   * Returns `expression` with every backtick nested inside it replaced by that
   * backtick's runtime IIFE, leaving all other code untouched.
   */
  private spliceRuntime(expression: ts.Expression): ts.Expression {
    const { ts } = this;
    const transformer: ts.TransformerFactory<ts.Expression> =
      (context) => (root) => {
        const visit = (node: ts.Node): ts.Node => {
          if (
            ts.isNoSubstitutionTemplateLiteral(node) ||
            ts.isTemplateExpression(node)
          ) {
            return this.rewriteTemplate(node)?.runtime ?? node;
          }
          return ts.visitEachChild(node, visit, context);
        };
        return ts.visitNode(root, visit) as ts.Expression;
      };

    const result = ts.transform(expression, [transformer]);
    const [runtime] = result.transformed;
    result.dispose();
    return runtime;
  }

  /** Parses `text` as a single expression, or returns `undefined`. */
  private parse(text: string, offset: number): ts.Expression | undefined {
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
    this.rebase(statement.expression, offset);
    return statement.expression;
  }

  /** Shifts a parsed subtree's positions into the original file's coordinates. */
  private rebase(node: ts.Node, offset: number): void {
    const { ts } = this;
    ts.setTextRange(node, { pos: node.pos + offset, end: node.end + offset });
    node.forEachChild((child) => this.rebase(child, offset));
  }

  /** Builds the runtime `(() => { ...splices; return Backtick.make(...); })()`. */
  private iife(
    spliceDecls: ts.Statement[],
    spliceMeta: ts.PropertyAssignment[],
    freeVars: ReadonlySet<string>,
    body: RewriteResult,
  ): ts.Expression {
    const { factory } = this.ts;

    const meta = factory.createObjectLiteralExpression(
      [
        factory.createPropertyAssignment(
          "splices",
          factory.createObjectLiteralExpression(spliceMeta, false),
        ),
        factory.createPropertyAssignment(
          "freeVars",
          factory.createArrayLiteralExpression(
            [...freeVars].map((name) => factory.createStringLiteral(name)),
            false,
          ),
        ),
      ],
      true,
    );

    const make = factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("Backtick"),
        "make",
      ),
      undefined,
      [
        this.arrow(
          [factory.createParameterDeclaration(undefined, undefined, "v")],
          this.visit("visitBacktick", [
            factory.createNull(),
            meta,
            body.runtime,
          ]),
        ),
        this.arrow([], body.virtual),
      ],
    );

    return factory.createCallExpression(
      factory.createParenthesizedExpression(
        this.arrow(
          [],
          factory.createBlock(
            [...spliceDecls, factory.createReturnStatement(make)],
            true,
          ),
        ),
      ),
      undefined,
      [],
    );
  }

  /** Builds `const <name> = <initializer>;`. */
  private constDeclaration(
    name: string,
    initializer: ts.Expression,
  ): ts.VariableStatement {
    const { factory, NodeFlags } = this.ts;
    return factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            name,
            undefined,
            undefined,
            initializer,
          ),
        ],
        NodeFlags.Const,
      ),
    );
  }

  /** Builds a parameterless-or-not arrow function. */
  private arrow(
    parameters: ts.ParameterDeclaration[],
    body: ts.ConciseBody,
  ): ts.ArrowFunction {
    const { factory, SyntaxKind } = this.ts;
    return factory.createArrowFunction(
      undefined,
      undefined,
      parameters,
      undefined,
      factory.createToken(SyntaxKind.EqualsGreaterThanToken),
      body,
    );
  }

  /** Builds a synthetic `Backtick.<method>(argument)` call (the type side). */
  private backtick(method: string, argument: ts.Expression): ts.Expression {
    const { factory } = this.ts;
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("Backtick"),
        method,
      ),
      undefined,
      [argument],
    );
  }

  /** Builds a synthetic `v.<method>(...args)` visitor call (the runtime side). */
  private visit(method: string, args: ts.Expression[]): ts.Expression {
    const { factory } = this.ts;
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("v"),
        method,
      ),
      undefined,
      args,
    );
  }
}
