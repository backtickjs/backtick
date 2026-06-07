import type * as ts from "typescript";

export interface RewriteResult {
  /** Type/language-service view: a `Backtick.lift`/`lower` expression. */
  virtual: ts.Expression;
  /** Executable view: visitor calls, wrapped at the root in a `Backtick.make` IIFE. */
  runtime: ts.Expression;
}

/**
 * State threaded through {@link rewriteNode} while rewriting a single backtick.
 * One scope carries the splices in play, the `const` bindings they are hoisted
 * into, and the free variables referenced along the way.
 */
interface Scope {
  /**
   * Splice name -> its rewritten reference. Present only for a template with
   * `${...}` spans; when absent a bare identifier is a free variable rather than
   * a splice.
   */
  splices?: ReadonlyMap<string, RewriteResult>;
  /** Hoisted splice bindings, keyed by name: `const <name> = <initializer>`. */
  declaredVars: Map<string, ts.Expression>;
  /** Free variables referenced in the skeleton, for the runtime metadata. */
  usedVars: Set<string>;
}

export function rewrite(
  ts: typeof import("typescript"),
  template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
): RewriteResult | undefined {
  return rewriteNode(ts, template);
}

/**
 * Rewrites a node of *quoted* code into its virtual and runtime forms. When
 * `scope.splices` is given the node is a template's parsed skeleton, so a bare
 * identifier must resolve to one of the splices rather than passing through as
 * a free variable. Free variables (outside the skeleton) are collected into
 * `scope.usedVars` for the runtime metadata.
 */
function rewriteNode(
  ts: typeof import("typescript"),
  node: ts.Node,
  scope?: Scope,
): RewriteResult | undefined {
  const { factory } = ts;

  if (
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node)
  ) {
    return rewriteTemplate(ts, node);
  }

  if (ts.isBinaryExpression(node)) {
    const left = rewriteNode(ts, node.left, scope);
    const right = rewriteNode(ts, node.right, scope);
    if (!left || !right) return undefined;
    const operator = ts.tokenToString(node.operatorToken.kind) ?? "";
    return {
      virtual: factory.createBinaryExpression(
        left.virtual,
        node.operatorToken,
        right.virtual,
      ),
      runtime: visit(ts, "visitBinary", [
        factory.createNull(),
        left.runtime,
        factory.createStringLiteral(operator),
        right.runtime,
      ]),
    };
  }

  if (ts.isIdentifier(node)) {
    if (scope?.splices) return scope.splices.get(node.text);
    scope?.usedVars.add(node.text);
    return {
      virtual: node,
      runtime: visit(ts, "visitIdentifier", [
        factory.createNull(),
        factory.createStringLiteral(node.text),
      ]),
    };
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: node,
      runtime: visit(ts, "visitNumber", [
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
function rewriteTemplate(
  ts: typeof import("typescript"),
  node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
): RewriteResult | undefined {
  const { factory } = ts;

  const splices = ts.isTemplateExpression(node)
    ? new Map<string, RewriteResult>()
    : undefined;
  const scope: Scope = {
    splices,
    declaredVars: new Map(),
    usedVars: new Set(),
  };

  let text: string;
  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    text = node.text;
  } else {
    text = node.head.text;
    for (const [i, span] of node.templateSpans.entries()) {
      const splice = rewriteSplice(ts, span.expression);
      if (!splice) return undefined;

      const name = `__splice${i}__`;
      splices!.set(name, {
        virtual: backtick(ts, "lower", splice.virtual),
        runtime: visit(ts, "visitSplice", [
          factory.createNull(),
          factory.createStringLiteral(name),
          factory.createIdentifier(name),
        ]),
      });
      scope.declaredVars.set(name, splice.runtime);
      text += name + span.literal.text;
    }
  }

  const skeleton = parse(ts, text, node.pos + 1);
  if (!skeleton) return undefined;
  const body = rewriteNode(ts, skeleton, scope);
  if (!body) return undefined;

  return {
    virtual: backtick(ts, "lift", body.virtual),
    runtime: iife(ts, scope, body),
  };
}

/**
 * Resolves a `${...}` splice. A splice that is itself a backtick is compiled
 * recursively. Otherwise the expression is ordinary code: it stays verbatim as
 * its type (`compileBacktick` maps it back to source), while its runtime form
 * has any backtick nested within it replaced by that backtick's IIFE.
 */
function rewriteSplice(
  ts: typeof import("typescript"),
  expression: ts.Expression,
): RewriteResult | undefined {
  if (
    ts.isNoSubstitutionTemplateLiteral(expression) ||
    ts.isTemplateExpression(expression)
  ) {
    return rewriteTemplate(ts, expression);
  }
  return { virtual: expression, runtime: spliceRuntime(ts, expression) };
}

/**
 * Returns `expression` with every backtick nested inside it replaced by that
 * backtick's runtime IIFE, leaving all other code untouched.
 */
function spliceRuntime(
  ts: typeof import("typescript"),
  expression: ts.Expression,
): ts.Expression {
  const transformer: ts.TransformerFactory<ts.Expression> =
    (context) => (root) => {
      const visit = (node: ts.Node): ts.Node => {
        if (
          ts.isNoSubstitutionTemplateLiteral(node) ||
          ts.isTemplateExpression(node)
        ) {
          return rewriteTemplate(ts, node)?.runtime ?? node;
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
function parse(
  ts: typeof import("typescript"),
  text: string,
  offset: number,
): ts.Expression | undefined {
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
  rebase(ts, statement.expression, offset);
  return statement.expression;
}

/** Shifts a parsed subtree's positions into the original file's coordinates. */
function rebase(
  ts: typeof import("typescript"),
  node: ts.Node,
  offset: number,
): void {
  ts.setTextRange(node, { pos: node.pos + offset, end: node.end + offset });
  node.forEachChild((child) => rebase(ts, child, offset));
}

/** Builds the runtime `(() => { ...splices; return Backtick.make(...); })()`. */
function iife(
  ts: typeof import("typescript"),
  scope: Scope,
  body: RewriteResult,
): ts.Expression {
  const { factory } = ts;

  const spliceDecls = [...scope.declaredVars].map(([name, initializer]) =>
    constDeclaration(ts, name, initializer),
  );
  const spliceMeta = [...scope.declaredVars.keys()].map((name) =>
    factory.createPropertyAssignment(name, factory.createIdentifier(name)),
  );

  const meta = factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        "splices",
        factory.createObjectLiteralExpression(spliceMeta, false),
      ),
      factory.createPropertyAssignment(
        "freeVars",
        factory.createArrayLiteralExpression(
          [...scope.usedVars].map((name) => factory.createStringLiteral(name)),
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
      arrow(
        ts,
        [factory.createParameterDeclaration(undefined, undefined, "v")],
        visit(ts, "visitBacktick", [factory.createNull(), meta, body.runtime]),
      ),
      arrow(ts, [], body.virtual),
    ],
  );

  return factory.createCallExpression(
    factory.createParenthesizedExpression(
      arrow(
        ts,
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
function constDeclaration(
  ts: typeof import("typescript"),
  name: string,
  initializer: ts.Expression,
): ts.VariableStatement {
  const { factory } = ts;
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
      ts.NodeFlags.Const,
    ),
  );
}

/** Builds a parameterless-or-not arrow function. */
function arrow(
  ts: typeof import("typescript"),
  parameters: ts.ParameterDeclaration[],
  body: ts.ConciseBody,
): ts.ArrowFunction {
  const { factory } = ts;
  return factory.createArrowFunction(
    undefined,
    undefined,
    parameters,
    undefined,
    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    body,
  );
}

/** Builds a synthetic `Backtick.<method>(argument)` call (the type side). */
function backtick(
  ts: typeof import("typescript"),
  method: string,
  argument: ts.Expression,
): ts.Expression {
  const { factory } = ts;
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
function visit(
  ts: typeof import("typescript"),
  method: string,
  args: ts.Expression[],
): ts.Expression {
  const { factory } = ts;
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("v"),
      method,
    ),
    undefined,
    args,
  );
}
