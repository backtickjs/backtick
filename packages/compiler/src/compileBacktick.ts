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

  /** Walks the rewritten expression into mapped segments. */
  const emit = (node: ts.Expression): MappedSegment[] => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression as ts.PropertyAccessExpression;
      const head = `${(callee.expression as ts.Identifier).text}.${callee.name.text}`;
      const [argument] = node.arguments;
      return [{ virtual: `${head}(` }, ...emit(argument), { virtual: ")" }];
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
