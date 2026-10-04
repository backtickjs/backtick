import type ts from "typescript";
import { compileScript, type Plugin } from "./compileScript.js";
import { parseSourceFile } from "./parseFile.js";
import { rewriteFile } from "./rewriteFile.js";
import { createCall, moduleDeclaration } from "./rewriteScript.js";

export interface TransformOptions {
  /**
   * What a script's source map names its host file, given TypeScript's name for
   * it: for a build whose file names are paths on its own machine. By default,
   * TypeScript's name.
   */
  readonly sourceName?: (fileName: string) => string;
  /**
   * The framework's compile steps, run in series over each script: Solid's
   * adapter's `solid()`. None by default, which leaves a script's JSX for a
   * bundle's own plugins.
   */
  readonly plugins?: readonly Plugin[];
}

export function transform(
  ts: typeof import("typescript"),
  addDiagnostic?: (diagnostic: ts.Diagnostic) => void,
  { sourceName = (fileName) => fileName, plugins = [] }: TransformOptions = {},
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => (sourceFile) => {
    const parsedFile = parseSourceFile(ts, sourceFile);
    if (parsedFile.scripts.length === 0) {
      return sourceFile;
    }

    const rewrittenFile = rewriteFile(ts, parsedFile);

    if (addDiagnostic) {
      for (const diagnostic of rewrittenFile.diagnostics) {
        addDiagnostic({
          file: sourceFile,
          start: diagnostic.range.start,
          length: diagnostic.range.end - diagnostic.range.start,
          messageText: diagnostic.message,
          category: diagnostic.category,
          code: diagnostic.code,
          source: "backtick",
        });
      }
    }

    // Each script as the client gets it, its module declared once for every
    // run of it; one that didn't parse is left as written.
    const name = sourceName(sourceFile.fileName);
    const modules: ts.Statement[] = [];
    const byStart = new Map<number, ts.Node>();
    for (const [template, { runtime }] of rewrittenFile.scripts) {
      if (runtime !== null) {
        const compiled = compileScript(ts, runtime.emitted, name, plugins);
        const moduleName = `$module${modules.length}`;
        modules.push(moduleDeclaration(ts, moduleName, runtime.id, compiled));
        byStart.set(
          template.getStart(rewrittenFile.sourceFile),
          createCall(ts, moduleName, runtime),
        );
      }
    }

    const visit: ts.Visitor = (node) => {
      if (
        ts.isTaggedTemplateExpression(node) &&
        ts.isIdentifier(node.tag) &&
        node.tag.text === "cs" &&
        node.pos >= 0
      ) {
        const runtime = byStart.get(node.getStart(rewrittenFile.sourceFile));
        if (runtime) {
          return ts.visitEachChild(runtime, visit, context);
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    const visited = ts.visitNode(
      sourceFile,
      visit,
      ts.isSourceFile,
    ) as ts.SourceFile;
    // After the imports, before anything that could run a script.
    const imports = visited.statements.findIndex(
      (statement) => !ts.isImportDeclaration(statement),
    );
    const at = imports === -1 ? visited.statements.length : imports;
    return context.factory.updateSourceFile(visited, [
      ...visited.statements.slice(0, at),
      ...modules,
      ...visited.statements.slice(at),
    ]);
  };
}
