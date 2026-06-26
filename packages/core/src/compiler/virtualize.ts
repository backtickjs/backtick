import type { SourceMapping } from "./buildMappings.js";
import { parseFile } from "./parseFile.js";
import { printVirtualCode } from "./printVirtualCode.js";
import { rewriteFile } from "./rewriteFile.js";

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

  const rewrittenFile = rewriteFile(ts, parsedFile);

  const { virtualCode, mappings } = printVirtualCode(
    ts,
    parsedFile,
    rewrittenFile,
  );

  return { virtualCode, mappings };
}
