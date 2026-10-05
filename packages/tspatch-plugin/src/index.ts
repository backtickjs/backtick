import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pluginsFrom, transform } from "@backtickjs/compiler";
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
 * and compile with `tspc` (from `ts-patch`) instead of `tsc`. The framework's
 * compile steps are the project's, named in its `package.json`:
 *
 * ```json
 * "backtick": { "plugins": ["@backtickjs/solid-js/plugin"] }
 * ```
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
  const packageJson = readFileSync(path.join(root, "package.json"), "utf8");
  const { name } = JSON.parse(packageJson) as { name: string };
  // Loaded as the project resolves them, at once, as a transformer is.
  const plugins = pluginsFrom(
    packageJson,
    createRequire(path.resolve(root, "package.json")),
  );
  return transform(
    ts,
    (diagnostic) => {
      addDiagnostic(diagnostic);
    },
    // TypeScript's file names use `/` on every platform.
    {
      sourceName: (fileName) =>
        path.posix.join(name, path.posix.relative(root, fileName)),
      plugins,
    },
  );
}
