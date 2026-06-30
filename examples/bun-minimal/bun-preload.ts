import { readFileSync } from "node:fs";
import { transform } from "@backtick/core/compiler";
import { plugin } from "bun";
import ts from "typescript";

plugin({
  name: "backtick",
  setup(build) {
    build.onLoad({ filter: /[/\\]src[/\\].*\.tsx?$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");
      const { outputText } = ts.transpileModule(source, {
        fileName: args.path,
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.Preserve,
          inlineSources: true,
          inlineSourceMap: true,
        },
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
