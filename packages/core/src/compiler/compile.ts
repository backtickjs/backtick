import type { CodeMapping } from "@volar/language-core";
import { compileFile } from "./compileFile.js";
import { parseFile } from "./parseFile.js";
import { printRuntime, printVirtual } from "./printVirtual.js";

export interface Compiled {
  virtualCode: string;
  runtimeCode: string;
  mappings: CodeMapping[];
}

export function compile(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Compiled {
  const parsedFile = parseFile(ts, filePath, sourceText);

  const { scripts } = compileFile(ts, parsedFile);

  const { code: virtualCode, mappings } = printVirtual(ts, parsedFile, scripts);

  const runtimeCode = printRuntime(ts, parsedFile, scripts);

  return { virtualCode, runtimeCode, mappings };
}
