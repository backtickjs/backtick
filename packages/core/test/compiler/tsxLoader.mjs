import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Node can't load `.tsx` on its own. Register this hook (via `module.register`)
// to transpile compiled fixture runtime files so they can be imported and run.
export async function load(url, context, nextLoad) {
  if (url.endsWith(".tsx")) {
    const fileName = fileURLToPath(url);
    const { outputText } = ts.transpileModule(await readFile(fileName, "utf8"), {
      fileName,
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
      },
    });
    return { format: "module", source: outputText, shortCircuit: true };
  }
  return nextLoad(url, context);
}
