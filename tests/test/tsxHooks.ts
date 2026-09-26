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
    source: transpile(
      ts,
      fileName,
      sourceText,
      "@backtickjs/solid-js",
    ),
    shortCircuit: true,
  };
};

// What a bundle imports, resolved from this package, as a page's import map
// resolves it: a bundle is imported as a `data:` URL, from which Node resolves
// nothing. And Solid's DOM build, where Node would pick its server build: the
// one a page runs, and the one the client draws with. Only for Solid, since
// the condition changes what other packages resolve to too.
export const resolve: ResolveHook = (specifier, context, nextResolve) => {
  const parentURL = context.parentURL?.startsWith("data:")
    ? import.meta.url
    : context.parentURL;
  return nextResolve(specifier, {
    ...context,
    parentURL,
    conditions:
      specifier === "solid-js" || specifier.startsWith("solid-js/")
        ? ["browser", ...context.conditions]
        : context.conditions,
  });
};
