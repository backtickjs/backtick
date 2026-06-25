import { compileFile } from "./compileFile.js";
import { parseFile } from "./parseFile.js";
import { printRuntimeCode } from "./printRuntimeCode.js";

export interface Compiled {
  runtimeCode: string;
}

export function compile(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Compiled {
  const parsedFile = parseFile(ts, filePath, sourceText);

  const compiledFile = compileFile(ts, parsedFile);

  const runtimeCode = printRuntimeCode(ts, parsedFile, compiledFile);

  return { runtimeCode };
}
