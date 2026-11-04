// What `save_app` publishes: an app's release, its App.tsx compiled to
// JavaScript as node-plugin compiles it here, then bundled with the server
// packages it imports into one minified module: frozen as it was checked, so
// nothing Backtick upgrades later changes it. save_app has refused imports
// the server doesn't have (imports.ts). Static only: the file's code doesn't
// run.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { compileModule, pluginsFrom } from "@backtickjs/compiler";
import { build } from "esbuild";
import ts from "typescript";

const root = fileURLToPath(new URL("..", import.meta.url));
const packageJson = join(root, "package.json");
const plugins = pluginsFrom(
  readFileSync(packageJson, "utf8"),
  createRequire(packageJson),
);

export type Compiled =
  | { code: string; errors?: never }
  | { errors: string[]; code?: never };

export async function compile(file: string): Promise<Compiled> {
  let code: string;
  try {
    // Relative, as node-plugin names it: the compiler finds the tsconfig
    // beside it.
    code = compileModule(ts, relative(root, file), readFileSync(file, "utf8"), {
      plugins,
    });
  } catch (error) {
    return { errors: [String((error as Error).message)] };
  }
  // As a Worker runs it: Node's built-ins, `nodejs_compat`'s, left out.
  // Class names kept, so errors keep their names (`ClientVersionMismatch`).
  const { outputFiles } = await build({
    stdin: { contents: code, resolveDir: dirname(file), sourcefile: "App.js" },
    bundle: true,
    format: "esm",
    platform: "neutral",
    conditions: ["workerd", "worker", "import"],
    mainFields: ["module", "main"],
    external: ["node:*"],
    minify: true,
    keepNames: true,
    write: false,
  });
  return { code: outputFiles[0]!.text };
}
