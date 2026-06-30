import { readFileSync } from "node:fs";
import { transform } from "@backtick/core/compiler";
import { plugin } from "bun";
import ts from "typescript";

const { config } = ts.readConfigFile(
  `${import.meta.dir}/tsconfig.json`,
  ts.sys.readFile,
);

const { options: compilerOptions } = ts.convertCompilerOptionsFromJson(
  config.compilerOptions,
  import.meta.dir,
);

plugin({
  name: "backtick",
  setup(build) {
    build.onLoad({ filter: /[/\\]src[/\\].*\.tsx?$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");
      const { outputText } = ts.transpileModule(source, {
        fileName: args.path,
        compilerOptions,
        transformers: { before: [transform(ts), addBunPragma(ts)] },
      });
      return {
        contents: outputText,
        loader: args.path.endsWith(".tsx") ? "jsx" : "js",
      };
    });
  },
});

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
