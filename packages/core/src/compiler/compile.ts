import { compileFile } from "./compileFile.js";
import { parseFile } from "./parseFile.js";
import { printRuntime } from "./printVirtual.js";

export interface Compiled {
  runtimeCode: string;
}

export function compile(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Compiled {
  const parsedFile = parseFile(ts, filePath, sourceText);

  const { scripts } = compileFile(ts, parsedFile);

  const runtimeCode = printRuntime(ts, parsedFile, scripts);

  return { runtimeCode };
}
