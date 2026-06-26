import type { SourceMapping } from "./buildMappings.js";
import { compileFile } from "./compileFile.js";
import { parseFile } from "./parseFile.js";
import { printVirtualCode } from "./printVirtualCode.js";

export interface Virtualized {
  virtualCode: string;
  mappings: SourceMapping[];
}

export function virtualize(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Virtualized {
  const parsedFile = parseFile(ts, filePath, sourceText);

  const compiledFile = compileFile(ts, parsedFile);

  const { virtualCode, mappings } = printVirtualCode(
    ts,
    parsedFile,
    compiledFile,
  );

  return { virtualCode, mappings };
}
