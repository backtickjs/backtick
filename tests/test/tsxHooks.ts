import { readFile } from "node:fs/promises";
import type { LoadHook, ResolveHook } from "node:module";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { transpile } from "@backtickjs/compiler";
import ts from "typescript";

// A `.tsx` test file, compiled the way a project's own build compiles one: its
// JSX and `cs` scripts through the Backtick compiler; Solid compiles each
// bundle. Node strips types from `.ts` itself, and runs no `.tsx` at all.
//
// Diagnostics are left to the typecheck suite, as a build would leave them to
// the editor: a test file that has some still runs.
const testsRoot = dirname(fileURLToPath(import.meta.url));

export const load: LoadHook = async (url, context, nextLoad) => {
  if (!url.endsWith(".tsx")) {
    return nextLoad(url, context);
  }
  const path = fileURLToPath(url);
  const sourceText = await readFile(path, "utf8");
  // Named from the test directory, as `compiler.test.ts` names it when it
  // records what the file compiles to.
  const fileName = relative(testsRoot, path);
  return {
    format: "module",
    source: transpile(ts, fileName, sourceText, "@backtickjs/solid-js"),
    shortCircuit: true,
  };
};

// The page's import map, as the tests have it: a specifier names the same
// module whoever imports it — a test, `draw`'s bundle, a page's script, Solid
// itself — as a browser resolves an import map. Solid is its DOM build, the one
// a page runs, where Node would pick its server build; `app` is the module an
// app adds beside it (see `stdlib/target-builtins.test.tsx`).
const APP = new URL("./stdlib/app.ts", import.meta.url).href;

export const resolve: ResolveHook = (specifier, context, nextResolve) => {
  if (specifier === "app") {
    return { url: APP, shortCircuit: true };
  }
  if (specifier === "solid-js" || specifier.startsWith("solid-js/")) {
    return nextResolve(specifier, {
      ...context,
      parentURL: import.meta.url,
      conditions: ["browser", ...context.conditions],
    });
  }
  return nextResolve(specifier, context);
};
