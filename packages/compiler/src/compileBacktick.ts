import type * as ts from "typescript";
import type { CompileResult } from "./index.js";
import SourceMapBuilder from "./SourceMapBuilder.js";
import { Rewriter } from "./rewriter.js";

export default function compileBacktick(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): CompileResult {
  const rewriter = new Rewriter(ts);
  const builder = new SourceMapBuilder(sourceFile.text);

  const emitTemplate = (
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ) => {
    const rewritten = rewriter.rewrite(template, sourceFile);
    if (!rewritten) return;

    builder.replace(
      template.getStart(sourceFile),
      template.end,
      rewritten.virtual,
    );
  };

  const walk = (node: ts.Node) => {
    if (
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node)
    ) {
      emitTemplate(node);
      return;
    }
    node.forEachChild(walk);
  };
  walk(sourceFile);

  return builder.finish();
}
