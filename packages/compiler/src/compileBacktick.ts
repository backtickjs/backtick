import type * as ts from "typescript";
import type SourceMapBuilder from "./SourceMapBuilder.js";
import type { MappedSegment } from "./SourceMapBuilder.js";
import type { Rewriter } from "./rewriter.js";

/**
 * Rewrites a single backtick template and emits the result into `builder`.
 * No-op when the template body is not a single expression.
 */
export default function compileBacktick(
  ts: typeof import("typescript"),
  template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  sourceFile: ts.SourceFile,
  rewriter: Rewriter,
  builder: SourceMapBuilder,
): void {
  const rewritten = rewriter.rewrite(template);
  if (!rewritten) return;

  /** Whether `node` is a synthetic `Backtick.<method>(...)` wrapper call. */
  const isBacktickCall = (node: ts.Expression): node is ts.CallExpression =>
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "Backtick";

  /**
   * Emits a `${...}` splice's content. The user's own expression is emitted
   * verbatim and mapped 1:1 to its source, except for any backtick nested within
   * it — those are compiled like the rest of the rewrite. So `x + ` + "`4`" stays
   * `x + ` while the `` `4` `` becomes `Backtick.lift(4)`.
   */
  const emitSplice = (node: ts.Expression): MappedSegment[] => {
    if (isBacktickCall(node)) return emit(node);

    const segments: MappedSegment[] = [];
    let cursor = node.getStart(sourceFile);
    const flush = (until: number) => {
      if (until <= cursor) return;
      segments.push({
        virtual: sourceFile.text.slice(cursor, until),
        source: { start: cursor, length: until - cursor },
      });
      cursor = until;
    };

    const walk = (inner: ts.Node): void => {
      if (
        ts.isNoSubstitutionTemplateLiteral(inner) ||
        ts.isTemplateExpression(inner)
      ) {
        flush(inner.getStart(sourceFile));
        const nested = rewriter.rewrite(inner);
        if (nested) segments.push(...emit(nested.virtual));
        else flush(inner.end);
        cursor = inner.end;
        return;
      }
      inner.forEachChild(walk);
    };

    walk(node);
    flush(node.end);
    return segments;
  };

  /** Walks the rewritten expression into mapped segments. */
  const emit = (node: ts.Expression): MappedSegment[] => {
    if (isBacktickCall(node)) {
      const callee = node.expression as ts.PropertyAccessExpression;
      const head = `Backtick.${callee.name.text}`;
      const [argument] = node.arguments;
      // `lower` wraps a splice, whose content stays as-is unless it's a backtick.
      const inner =
        callee.name.text === "lower" ? emitSplice(argument) : emit(argument);
      return [{ virtual: `${head}(` }, ...inner, { virtual: ")" }];
    }

    if (ts.isBinaryExpression(node)) {
      const operator = ts.tokenToString(node.operatorToken.kind) ?? "";
      return [
        ...emit(node.left),
        { virtual: ` ${operator} ` },
        ...emit(node.right),
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
  };

  builder.replaceWith(
    template.getStart(sourceFile),
    template.end,
    emit(rewritten.virtual),
  );
}
