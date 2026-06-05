import type { CodeMapping } from "@volar/language-core";
import compileBacktick from "./compileBacktick.js";

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

  return compileBacktick(ts, sourceFile);
}
