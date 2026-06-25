import type { CodeMapping } from "@volar/language-core";
import { compileFile } from "./compileFile.js";
import { parseFile } from "./parseFile.js";

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

  const compiledFile = compileFile(ts, parsedFile);

  const printer = ts.createPrinter();

  return {
    virtualCode: printer.printFile(compiledFile.virtual),
    runtimeCode: printer.printFile(compiledFile.runtime),
    mappings: [],
  };
}
