import type ts from "typescript";
import compileBacktick from "./compileBacktick.js";
import type { CompileResult } from "./index.js";

export default function compileSourceFile(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): CompileResult {
  return compileBacktick(ts, sourceFile);
}
