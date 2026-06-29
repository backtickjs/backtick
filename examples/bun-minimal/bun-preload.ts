// Bun preload plugin: transpile backtick `src` modules through the
// `@backtick/core` compiler (which applies the `cs` transform) and emit an
// inline source map.
//
// Why this exists: Bun only remaps stack traces for code it transpiles itself.
// If we pre-built with `tspc` and ran the emitted `dist/index.js`, Bun would
// ignore the source map and report `dist/...` locations. By transpiling at load
// time here, Bun owns the source map, so a thrown error's stack trace points
// back to the original `src/index.ts`.
//
// Note: the transformed module must be *imported*, not used as the entry point.
// Bun swallows an uncaught top-level throw coming from a plugin-transformed
// entry, so `run.ts` is a thin entry that imports `./src/index.ts`.

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
        inlineSourceMap: true,
      });
      return { contents: outputText, loader: "js" };
    });
  },
});
