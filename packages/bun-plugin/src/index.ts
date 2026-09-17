import { readFileSync } from "node:fs";
import path from "node:path";
import { transform } from "@backtickjs/compiler";
import { plugin } from "bun";
import ts from "typescript";

const compilerOptions = loadCompilerOptions();

/**
 * Use it from a `bunfig.toml`:
 *
 * ```toml
 * preload = ["@backtickjs/bun-plugin"]
 * ```
 *
 * or from the command line:
 *
 * ```sh
 * bun --preload @backtickjs/bun-plugin ./src/index.ts
 * ```
 */
plugin({
  name: "backtick",
  setup(build) {
    build.onLoad({ filter: /\.tsx?$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");

      // Only first-party files that actually use `cs`...`` need rewriting;
      // everything else is passed through untouched. Returning `undefined` here
      // throws on Bun >= 1.3 ("onLoad() expects an object returned"), so hand
      // back the original source with a plain TS/TSX loader instead.
      if (args.path.includes("node_modules") || !source.includes("cs`")) {
        return {
          contents: source,
          loader: args.path.endsWith(".tsx") ? "tsx" : "ts",
        };
      }

      const fileName =
        path.relative(process.cwd(), args.path).split(path.sep).join("/") ||
        args.path;

      const diagnostics: ts.Diagnostic[] = [];
      const { outputText } = ts.transpileModule(source, {
        fileName,
        compilerOptions,
        transformers: {
          before: [
            transform(ts, (diagnostic) => diagnostics.push(diagnostic)),
            addBunPragma(ts),
          ],
        },
      });

      // A script the compiler refused is emitted with `null` where the refused
      // code was, so it must not load.
      const errors = diagnostics.filter(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
      );
      
      if (errors.length > 0) {
        throw new Error(
          ts.formatDiagnostics(errors, {
            getCanonicalFileName: (name) => name,
            getCurrentDirectory: () => process.cwd(),
            getNewLine: () => "\n",
          }),
        );
      }

      return {
        contents: outputText,
        loader: args.path.endsWith(".tsx") ? "jsx" : "js",
      };
    });
  },
});

function loadCompilerOptions(): ts.CompilerOptions {
  const configPath = ts.findConfigFile(
    process.cwd(),
    ts.sys.fileExists,
    "tsconfig.json",
  );

  let compilerOptions: ts.CompilerOptions = {};
  if (configPath) {
    const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
    ({ options: compilerOptions } = ts.convertCompilerOptionsFromJson(
      config?.compilerOptions,
      path.dirname(configPath),
    ));
  }

  // The `// @bun` pragma trick (see addBunPragma) only works with an inline
  // source map, so force it on regardless of the project's configuration.
  return {
    ...compilerOptions,
    sourceMap: false,
    inlineSourceMap: true,
    inlineSources: true,
  };
}

// HACK: stamp a `// @bun` pragma at the top of the output to trick Bun into
// using our inline source map.
//
// This relies on undocumented Bun internals and could break on any Bun upgrade.
// The proper fix would be a real Bun plugin API for handing back a source map.
function addBunPragma(
  ts: typeof import("typescript"),
): ts.TransformerFactory<ts.SourceFile> {
  return (_context) => (sourceFile) => {
    const [first] = sourceFile.statements;
    if (first) {
      ts.addSyntheticLeadingComment(
        first,
        ts.SyntaxKind.SingleLineCommentTrivia,
        " @bun",
        true,
      );
    }
    return sourceFile;
  };
}
