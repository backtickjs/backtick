import { readFileSync } from "node:fs";
import { transpile } from "@backtick/core/compiler";
import { plugin } from "bun";
import ts from "typescript";

plugin({
  name: "backtick",
  setup(build) {
    build.onLoad({ filter: /[/\\]src[/\\].*\.ts$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");
      const { outputText } = transpile(ts, args.path, source, {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        inlineSources: true,
        inlineSourceMap: true,
      });
      return { contents: outputText, loader: "js" };
    });
  },
});
