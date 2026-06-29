import type { CompilerOptions } from "typescript";
import { transform } from "./transform.js";

export interface Compiled {
  runtimeCode: string;
  sourceMap: string | undefined;
}

export function compile(
  ts: typeof import("typescript"),
  fileName: string,
  sourceText: string,
  compilerOptions: CompilerOptions,
): Compiled {
  const { outputText, sourceMapText } = ts.transpileModule(sourceText, {
    fileName,
    compilerOptions: compilerOptions,
    transformers: { before: [transform(ts)] },
  });

  return {
    runtimeCode: outputText,
    sourceMap: sourceMapText,
  };
}
