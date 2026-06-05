import type * as ts from "typescript";
import type SourceMapBuilder from "./SourceMapBuilder.js";
import type { Rewriter } from "./rewriter.js";

/**
 * Rewrites a single backtick template and emits the result into `builder`.
 * No-op when the template body is not a single expression.
 */
export default function compileBacktick(
  template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  sourceFile: ts.SourceFile,
  rewriter: Rewriter,
  builder: SourceMapBuilder,
): void {
  const rewritten = rewriter.rewrite(template);
  if (!rewritten) return;

  builder.replaceWith(
    template.getStart(sourceFile),
    template.end,
    rewritten.segments,
  );
}
