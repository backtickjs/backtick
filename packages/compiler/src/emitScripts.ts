import type { EmittedScript } from "./emitScript.js";
import { parseSourceText } from "./parseFile.js";
import { rewriteFile } from "./rewriteFile.js";

/** A script's emitted code, by where the host wrote it. */
export interface EmittedScriptAt extends EmittedScript {
  // the offset of its `cs` in the host file
  readonly start: number;
}

/**
 * What each of a file's scripts compiles to for the client, in source order:
 * nested scripts too, each as its own entry.
 */
export function emitScripts(
  ts: typeof import("typescript"),
  fileName: string,
  sourceText: string,
): EmittedScriptAt[] {
  const file = rewriteFile(ts, parseSourceText(ts, fileName, sourceText));
  return Array.from(file.scripts)
    .flatMap(([template, script]) =>
      script.emitted === null
        ? []
        : [{ start: template.getStart(file.sourceFile), ...script.emitted }],
    )
    .sort((a, b) => a.start - b.start);
}
