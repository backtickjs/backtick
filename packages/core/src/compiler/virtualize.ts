import type { SourceMapping } from "./buildMappings.js";
import type { Diagnostic } from "./diagnostics.js";
import { parseSourceText } from "./parseFile.js";
import { printVirtualCode } from "./printVirtualCode.js";
import { rewriteFile } from "./rewriteFile.js";

export interface Virtualized {
  virtualCode: string;
  mappings: SourceMapping[];
  diagnostics: Diagnostic[];
}

export function virtualize(
  ts: typeof import("typescript"),
  filePath: string,
  sourceText: string,
): Virtualized {
  const parsedFile = parseSourceText(ts, filePath, sourceText);

  const rewrittenFile = rewriteFile(ts, parsedFile);

  const { virtualCode, mappings } = printVirtualCode(
    ts,
    parsedFile,
    rewrittenFile,
  );

  return { virtualCode, mappings, diagnostics: rewrittenFile.diagnostics };
}
