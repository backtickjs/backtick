import type ts from "typescript";
import { type TransformOptions, transform } from "./transform.js";

/**
 * One standalone file, run through the transform.
 *
 * The options are here because a file standing alone has nobody to ask for
 * them. Everywhere a project is being built there is a `tsconfig.json` and the
 * `tsc` and Bun plugins read the user's; this is the other case — one source,
 * no project — which is what both an e2e fixture and a playground example are.
 * They have to be compiled the same way for either to say anything about the
 * other, and one exported function is how that stays true.
 *
 * `verbatimModuleSyntax` is the load-bearing option. Without it TypeScript
 * elides an import the source does not appear to use — `state`, where the
 * source says `$state` inside a template — while the metadata the transform
 * writes still names it, and what comes out throws `state is not defined`.
 *
 * What comes back is a module: the imports are still imports, because the
 * transform writes references to them that TypeScript has not seen and so
 * cannot rewrite. A caller that needs something runnable without a module
 * loader transpiles this again, to `require`/`exports`, in a second pass.
 *
 * `jsxImportSource` is the caller's, and the only one that is: which target a
 * file draws with is not something a compiler knows, and a default here would
 * be this package naming one target's package for every file it ever sees.
 */
export function transpile(
  ts: typeof import("typescript"),
  fileName: string,
  sourceText: string,
  jsxImportSource: string,
  addDiagnostic?: (diagnostic: ts.Diagnostic) => void,
  options?: TransformOptions,
): string {
  const { outputText } = ts.transpileModule(sourceText, {
    fileName,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource,
      sourceMap: false,
      verbatimModuleSyntax: true,
    },
    transformers: { before: [transform(ts, addDiagnostic, options)] },
  });
  return outputText;
}
