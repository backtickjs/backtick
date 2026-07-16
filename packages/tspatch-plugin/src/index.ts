import { transform } from "@backtickjs/compiler";
import type { PluginConfig, TransformerExtras } from "ts-patch";
import type ts from "typescript";

/**
 * Use it from a `tsconfig.json`:
 *
 * ```json
 * {
 *   "compilerOptions": {
 *     "plugins": [{ "transform": "@backtickjs/tspatch-plugin" }]
 *   }
 * }
 * ```
 *
 * and compile with `tspc` (from `ts-patch`) instead of `tsc`.
 */
export default function transformer(
  _program: ts.Program,
  _config: PluginConfig,
  { ts, addDiagnostic }: TransformerExtras,
): ts.TransformerFactory<ts.SourceFile> {
  return transform(ts, (diagnostic) => {
    addDiagnostic(diagnostic);
  });
}
