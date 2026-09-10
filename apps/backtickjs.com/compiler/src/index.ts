import { transpile } from "@backtickjs-internal/compiler";
import ts from "typescript";

/**
 * Backtick source, all the way to javascript that runs without a loader.
 *
 * The first pass is the compiler's own, so what an example here compiles to is
 * what an e2e fixture compiles to. It stops at a module, because the transform
 * writes references to imports that TypeScript has not seen and so cannot
 * rewrite — a reference to an import needs no rewriting while it stays one.
 *
 * The second turns that module into `require`/`exports`. Anywhere with a module
 * loader this is unnecessary: `node` runs the first pass as it is. It is for the
 * other case, where running the result has to be a function call — no import
 * map, no blob, and nothing that needs an origin, which is what lets a caller
 * run it somewhere confined.
 */
export function browserTranspile(
  fileName: string,
  sourceText: string,
  addDiagnostic?: (diagnostic: ts.Diagnostic) => void,
): string {
  // The playground draws in a page, so the web target is what an example here
  // is written against.
  const firstPass = transpile(
    ts,
    fileName,
    sourceText,
    "@backtickjs/web",
    addDiagnostic,
  );

  const { outputText: secondPass } = ts.transpileModule(firstPass, {
    fileName,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.CommonJS,
    },
  });

  return secondPass;
}
