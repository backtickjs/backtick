import type { CodeMapping } from "@volar/language-core";
import type * as ts from "typescript";
import compileBacktick from "./compileBacktick.js";
import SourceMapBuilder from "./SourceMapBuilder.js";

export type CompileOptions = {
  filename: string;
};

export interface CompileResult {
  virtualCode: string;
  mappings: CodeMapping[];
}

export function compile(
  ts: typeof import("typescript"),
  source: string,
  options: CompileOptions,
): CompileResult {
  const sourceFile = ts.createSourceFile(
    options.filename,
    source,
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  const builder = new SourceMapBuilder(sourceFile.text);

  const walk = (node: ts.Node) => {
    if (
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node)
    ) {
      compileBacktick(ts, node, sourceFile, builder);
      return;
    }
    node.forEachChild(walk);
  };

  walk(sourceFile);

  return builder.finish();
}
