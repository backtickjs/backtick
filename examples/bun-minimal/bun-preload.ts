import { readFileSync } from "node:fs";
import { transform } from "@backtick/core/compiler";
import { plugin } from "bun";
import ts from "typescript";

plugin({
  name: "backtick",
  setup(build) {
    build.onLoad({ filter: /[/\\]src[/\\].*\.ts$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");
      const { outputText } = ts.transpileModule(source, {
        fileName: args.path,
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          inlineSources: true,
          inlineSourceMap: true,
        },
        transformers: { before: [transform(ts), addBunPragma(ts)] },
      });
      return { contents: outputText, loader: "js" };
    });
  },
});

// HACK: stamp a `// @bun` pragma at the top of the output to coax Bun into
// honoring our inline source map.
//
// `// @bun` is really Bun's *internal* marker for "this is already-bundled Bun
// output" — meant to be written by Bun's own bundler, not by us. We're abusing
// it because that same already-bundled flag is the gate Bun uses to register a
// file's inline `//# sourceMappingURL=` map. Without the pragma, Bun ignores our
// map and stack traces point at the transpiled output instead of the source.
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
