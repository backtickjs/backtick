import { parseFile } from "./parseFile.js";
import { printRuntimeCode } from "./printRuntimeCode.js";
import { rewriteFile } from "./rewriteFile.js";

export interface Compiled {
  runtimeCode: string;
}

export function compile(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Compiled {
  const parsedFile = parseFile(ts, filePath, sourceText);

  const rewrittenFile = rewriteFile(ts, parsedFile);

  const runtimeCode = printRuntimeCode(ts, rewrittenFile);

  return { runtimeCode };
}
