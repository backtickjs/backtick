import { type CodeTransform, transform } from "@backtickjs/compiler";
import type { PluginConfig, TransformerExtras } from "ts-patch";
import type ts from "typescript";

/**
 * Backtick's transformer, with an adapter's transform — what an adapter's
 * `tspatch-plugin` entry exports, and a project names in its `tsconfig.json`:
 *
 * ```json
 * {
 *   "compilerOptions": {
 *     "plugins": [{ "transform": "@backtickjs/solid-js/tspatch-plugin" }]
 *   }
 * }
 * ```
 *
 * and compiles with `tspc` (from `ts-patch`) instead of `tsc`.
 */
export function createTransformer(options: { transform?: CodeTransform } = {}) {
  return (
    _program: ts.Program,
    _config: PluginConfig,
    { ts, addDiagnostic }: TransformerExtras,
  ): ts.TransformerFactory<ts.SourceFile> =>
    transform(
      ts,
      (diagnostic) => {
        addDiagnostic(diagnostic);
      },
      options.transform,
    );
}

// Without an adapter, for the `web-sdk` examples and benchmark until they move
// to one. Nothing new uses it; it goes with `web-sdk`.
export default createTransformer();
