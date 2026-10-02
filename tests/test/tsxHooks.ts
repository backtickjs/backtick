import { readFile } from "node:fs/promises";
import { createRequire, type LoadHook, type ResolveHook } from "node:module";
import { dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { transpile } from "@backtickjs/compiler";
import { solid } from "@backtickjs/solid-js/plugin";
import ts from "typescript";

// A `.tsx` test file, compiled the way a project's own build compiles one: its
// JSX and `cs` scripts through the Backtick compiler, each script then through
// Solid's. Node strips types from `.ts` itself, and runs no `.tsx` at all.
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
      undefined,
      { plugins: [solid()] },
    ),
    shortCircuit: true,
  };
};

// The page's import map, as the tests have it: a specifier names the same
// module whoever imports it — a test, `draw`'s bundle, a page's script, Solid
// itself — as a browser resolves an import map. Solid is its DOM build, the one
// a page runs, where Node would pick its server build; `app` is the module an
// app adds beside it (see `stdlib/target-builtins.test.tsx`); `acme-ui` a
// library it installs (see `bindings/library-component.test.tsx`).
const APP = new URL("./stdlib/app.ts", import.meta.url).href;
const ACME_UI = new URL("../fixtures/acme-ui/index.ts", import.meta.url).href;

const ADAPTER = pathToFileURL(
  createRequire(import.meta.url).resolve("@backtickjs/solid-js"),
).href;

export const resolve: ResolveHook = (specifier, context, nextResolve) => {
  if (specifier === "app") {
    return { url: APP, shortCircuit: true };
  }
  if (specifier === "acme-ui") {
    return { url: ACME_UI, shortCircuit: true };
  }
  if (specifier === "solid-js" || specifier.startsWith("solid-js/")) {
    return nextResolve(specifier, {
      ...context,
      // The adapter's Solid, the one its names are typed against.
      parentURL: ADAPTER,
      conditions: ["browser", ...context.conditions],
    });
  }
  return nextResolve(specifier, context);
};
