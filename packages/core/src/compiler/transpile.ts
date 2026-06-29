import type ts from "typescript";
import type { CompilerOptions } from "typescript";
import { transform } from "./transform.js";

export function transpile(
  ts: typeof import("typescript"),
  fileName: string,
  sourceText: string,
  compilerOptions: CompilerOptions,
): ts.TranspileOutput {
  return ts.transpileModule(sourceText, {
    fileName,
    compilerOptions: compilerOptions,
    transformers: { before: [transform(ts)] },
  });
}
