import { createRequire } from "node:module";
import { unmangle } from "@backtickjs-internal/compiler";
import { getBacktickLanguagePlugin } from "@backtickjs-internal/language-plugin";
import {
  getBacktickDiagnostics,
  unmangleDiagnostic,
} from "@backtickjs-internal/language-service";
import { fillSourceFileText } from "@volar/typescript/lib/node/transform.js";
import { runTsc } from "@volar/typescript/lib/quickstart/runTsc.js";
import type ts from "typescript";

const require = createRequire(import.meta.url);

export function run(tscPath = require.resolve("typescript/lib/tsc.js")) {
  // Use the standalone TypeScript API, not the `ts` handed to the callback: that
  // one is `runTsc`'s internal tsc.js CLI bundle, whose namespace members are
  // lazy `eval`-based getters that throw when read outside their module scope
  // (Backtick's `parseFile` reads `ts.ScriptTarget`).
  const ts = require("typescript") as typeof import("typescript");

  patchDecorateProgram(ts);

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

// What this tool is for beyond checking: a package that exports a client script
// gets a declaration carrying the script's real type. Plain `tsc` types
// `cs`...`` by the tag's own signature, `Client<ClientUnknown>`, because the
// precise type lives in the virtual code — which is what this program checks,
// and so what this program can write down.
//
// The names in it are the compiler's, though: `(__cs_n: number)` where a reader
// expects `(n: number)`. An `afterDeclarations` transformer renames them where
// the emitter prints them, on identifiers alone, so nothing inside a string
// literal is touched. Not at the file system: `sys.writeFile` writes through
// `openSync`, and the CLI bundle's `sys` is not this module's anyway.
function unmangleDeclarations(
  ts: typeof import("typescript"),
  program: ts.Program,
): void {
  const emit = program.emit.bind(program);
  program.emit = (
    targetSourceFile,
    writeFile,
    cancellationToken,
    emitOnlyDtsFiles,
    customTransformers,
  ) =>
    emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, {
      ...customTransformers,
      afterDeclarations: [
        ...(customTransformers?.afterDeclarations ?? []),
        // `context.factory` is the emitter's own, which is what makes this safe
        // to hand over from here: `visitEachChild` builds with the factory it
        // is given rather than with this module's TypeScript.
        (context) => (node) => {
          const visit = (child: ts.Node): ts.Node => {
            if (ts.isIdentifier(child)) {
              // Read through `escapedText` rather than `text`: an identifier
              // the declaration emitter built carries the escaped form, and
              // one starting with `__` is stored with a `_` in front of it.
              const written = ts.unescapeLeadingUnderscores(child.escapedText);
              const plain = unmangle(written);
              return plain === written
                ? child
                : context.factory.createIdentifier(plain);
            }
            return ts.visitEachChild(child, visit, context);
          };
          return ts.visitNode(node, visit) as typeof node;
        },
      ],
    });
}

// The JavaScript this would write is the virtual code — `cs.lift(cs.const(…))`,
// which throws where it is called. Refused rather than emitted, because the
// output would look like a build that worked.
function refuseJavaScriptEmit(options: {
  noEmit?: boolean;
  emitDeclarationOnly?: boolean;
}) {
  if (options.noEmit === true || options.emitDeclarationOnly === true) {
    return;
  }
  throw new Error(
    "`backtick-tsc` writes declarations, not JavaScript — what it would emit " +
      "is the virtual code the typechecker reads. Run it with " +
      "`--emitDeclarationOnly` or `--noEmit`, and leave the JavaScript to " +
      "`tspc` or the bundler plugin.",
  );
}

// Surfaces Backtick's own compiler diagnostics through `tsc` by wrapping the
// program's `getSemanticDiagnostics`. This has to patch Volar's `decorateProgram`
// module in place: `runTsc` proxies TypeScript internally and calls the module's
// export by property access at program-creation time, so reassigning it here is
// picked up.
function patchDecorateProgram(ts: typeof import("typescript")) {
  const decorateProgramModule =
    require("@volar/typescript/lib/node/decorateProgram.js") as typeof import("@volar/typescript/lib/node/decorateProgram.js");
  const volarDecorateProgram = decorateProgramModule.decorateProgram;

  decorateProgramModule.decorateProgram = (language, program) => {
    volarDecorateProgram(language, program);
    refuseJavaScriptEmit(program.getCompilerOptions());
    unmangleDeclarations(ts, program);

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
