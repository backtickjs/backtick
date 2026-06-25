import type { CodeMapping } from "@volar/language-core";
import { compileFile } from "./compileFile.js";
import { parseFile } from "./parseFile.js";
import { printVirtual } from "./printVirtual.js";

export interface Virtualized {
  virtualCode: string;
  mappings: CodeMapping[];
}

export function virtualize(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Virtualized {
  const parsedFile = parseFile(ts, filePath, sourceText);

  const { scripts } = compileFile(ts, parsedFile);

  const { code: virtualCode, mappings } = printVirtual(ts, parsedFile, scripts);

  return { virtualCode, mappings };
}
