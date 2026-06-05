import type ts from "typescript";
import type { CompileResult } from "./types.js";
import compileBacktick from "./compileBacktick.js";

export default function compileSourceFile(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): CompileResult {
  return compileBacktick(ts, sourceFile);
}
