import { readFile } from "node:fs/promises";
import type { LoadHook } from "node:module";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { transpile } from "@backtickjs/compiler";
import ts from "typescript";

// A `.tsx` test file, compiled the way a project's own build compiles one: its
// JSX and `cs` scripts through the Backtick compiler, against the web
// vocabulary. Node strips types from `.ts` itself, and runs no `.tsx` at all.
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
    source: transpile(ts, fileName, sourceText, "@backtickjs/web-sdk"),
    shortCircuit: true,
  };
};
