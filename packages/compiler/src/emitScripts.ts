import {
  type CompiledScript,
  compileScript,
  type Plugin,
} from "./compileScript.js";
import { parseSourceText } from "./parseFile.js";
import { rewriteFile } from "./rewriteFile.js";

/** A script's emitted code, by where the host wrote it. */
export interface EmittedScriptAt extends CompiledScript {
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
  // Its framework's compile steps (see `TransformOptions.plugins`).
  plugins: readonly Plugin[] = [],
): EmittedScriptAt[] {
  const file = rewriteFile(ts, parseSourceText(ts, fileName, sourceText));
  return Array.from(file.scripts)
    .flatMap(([template, { runtime }]) =>
      runtime === null
        ? []
        : [
            {
              start: template.getStart(file.sourceFile),
              ...compileScript(ts, runtime.emitted, fileName, plugins),
            },
          ],
    )
    .sort((a, b) => a.start - b.start);
}
