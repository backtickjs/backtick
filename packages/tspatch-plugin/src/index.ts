import { readFileSync } from "node:fs";
import path from "node:path";
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
  program: ts.Program,
  _config: PluginConfig,
  { ts, addDiagnostic }: TransformerExtras,
): ts.TransformerFactory<ts.SourceFile> {
  // A script's map names its file as its package does, `@scope/name/src/…`, as
  // webpack's `webpack://<package name>/…` does: the same on every machine, and
  // distinct from another package's in a bundle's map. The package is the one
  // whose `tsconfig.json` this builds.
  const root = path.posix.dirname(
    program.getCompilerOptions().configFilePath as string,
  );
  const { name } = JSON.parse(
    readFileSync(path.join(root, "package.json"), "utf8"),
  ) as { name: string };
  return transform(
    ts,
    (diagnostic) => {
      addDiagnostic(diagnostic);
    },
    // TypeScript's file names use `/` on every platform.
    {
      sourceName: (fileName) =>
        path.posix.join(name, path.posix.relative(root, fileName)),
    },
  );
}
