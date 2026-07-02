import { createRequire } from "node:module";
import { getBacktickLanguagePlugin } from "@backtick/language-plugin";
import {
  getBacktickDiagnostics,
  unmangleDiagnostic,
} from "@backtick/language-service";
import { fillSourceFileText } from "@volar/typescript/lib/node/transform.js";
import { runTsc } from "@volar/typescript/lib/quickstart/runTsc.js";

const require = createRequire(import.meta.url);

export function run(tscPath = require.resolve("typescript/lib/tsc.js")) {
  patchDecorateProgram();

  // Use the standalone TypeScript API, not the `ts` handed to the callback: that
  // one is `runTsc`'s internal tsc.js CLI bundle, whose namespace members are
  // lazy `eval`-based getters that throw when read outside their module scope
  // (Backtick's `parseFile` reads `ts.ScriptTarget`).
  const ts = require("typescript") as typeof import("typescript");

  return runTsc(
    tscPath,
    // No extra file extensions: Backtick virtualizes standard .ts/.tsx/.js/.jsx
    // in place, matching the TS server plugins (which also pass []).
    [],
    () => ({
      languagePlugins: [getBacktickLanguagePlugin(ts, (fileName) => fileName)],
    }),
  );
}

// Surfaces Backtick's own compiler diagnostics through `tsc` by wrapping the
// program's `getSemanticDiagnostics`. This has to patch Volar's `decorateProgram`
// module in place: `runTsc` proxies TypeScript internally and calls the module's
// export by property access at program-creation time, so reassigning it here is
// picked up.
function patchDecorateProgram() {
  const decorateProgramModule =
    require("@volar/typescript/lib/node/decorateProgram.js") as typeof import("@volar/typescript/lib/node/decorateProgram.js");
  const volarDecorateProgram = decorateProgramModule.decorateProgram;

  decorateProgramModule.decorateProgram = (language, program) => {
    volarDecorateProgram(language, program);

    const getSemanticDiagnostics = program.getSemanticDiagnostics.bind(program);
    program.getSemanticDiagnostics = (sourceFile, cancellationToken) => {
      const files = sourceFile ? [sourceFile] : program.getSourceFiles();
      return [
        ...getSemanticDiagnostics(sourceFile, cancellationToken).map(
          unmangleDiagnostic,
        ),
        ...files.flatMap((file) => {
          const diagnostics = getBacktickDiagnostics(
            language,
            file,
            file.fileName,
          );
          if (diagnostics.length > 0) {
            // The program's `file.text` is the compiled embedded code, but the
            // diagnostics carry source-coordinate ranges. Reuse Volar's
            // `fillSourceFileText` to swap the already-parsed file's leading
            // text back to the source snapshot in place — the same fix-up Volar
            // applies to its own transformed diagnostics, and idempotent, so it
            // stays a no-op when the file was already filled.
            fillSourceFileText(language, file);
          }
          return diagnostics;
        }),
      ];
    };
  };
}
