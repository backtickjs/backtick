import type { CompileResult } from "./types.js";
import compileSourceFile from "./compileSourceFile.js";

export type CompileOptions = {
  filename: string;
};

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

  return compileSourceFile(ts, sourceFile);
}
