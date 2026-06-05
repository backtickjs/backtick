import type { CodeMapping } from "@volar/language-core";
export type { CompileResult, RewriteResult, RewriteError } from "./compile.js";
import { compile } from "./compile.js";

export type CompileOptions = {
  filename: string;
};

export function compileToVirtualTSX(
  ts: typeof import("typescript"),
  source: string,
  options: CompileOptions,
): { code: string; mappings: CodeMapping[] } {
  const sourceFile = ts.createSourceFile(
    options.filename,
    source,
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  const { virtualCode, mappings } = compile(ts, sourceFile);

  return { code: virtualCode, mappings };
}
