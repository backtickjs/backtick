import remapping from "@jridgewell/remapping";
import type ts from "typescript";
import type { EmittedScript } from "./emitScript.js";

/**
 * A framework's compile step: a module in, the module it compiles to out, with
 * its map into the module it was given. Solid's adapter's `solid()` is one.
 * Synchronous, as a TypeScript transformer is.
 */
export type Plugin = (
  code: string,
  id: string,
) => { code: string; map: string };

/** A script as a build writes it, a module table's entry. */
export interface CompiledScript extends EmittedScript {
  /** The modules the code requires, by specifier, as Metro records them. */
  readonly dependencies: readonly string[];
}

/**
 * A script as a build writes it: the module whose default export it is,
 * through each plugin in turn, then a module table's entry,
 * `(module, exports, require) => { … }`, as webpack and Metro write one: its
 * body the module as CommonJS, JSX kept where no plugin compiled it, the
 * modules it requires its dependencies, its map chained onto the script's own
 * and naming the host file `sourceName`.
 */
export function compileScript(
  ts: typeof import("typescript"),
  script: EmittedScript,
  sourceName: string,
  plugins: readonly Plugin[],
): CompiledScript {
  let code = `export default (\n${script.code}\n);`;
  const maps = [down(renamed(script.map, sourceName))];
  for (const plugin of plugins) {
    const compiled = plugin(code, `${sourceName}.jsx`);
    code = compiled.code;
    maps.unshift(compiled.map);
  }
  // The module as CommonJS, by TypeScript: its imports `require` calls, its
  // default export `exports.default`, so it runs as a function's body.
  const dependencies: string[] = [];
  const output = ts.transpileModule(code, {
    fileName: "module.jsx",
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      sourceMap: true,
    },
    transformers: { before: [specifiers(ts, dependencies)] },
  });
  maps.unshift(output.sourceMapText!);
  const body = output.outputText.replace(/\n\/\/# sourceMappingURL=.*$/, "");
  // Chained as an array, not by source name: Babel names a map's source by
  // the id's basename.
  const map = remapping(maps, () => null, { excludeContent: true }).toString();
  return {
    code: `(module, exports, require) => {\n${body}\n}`,
    map: down(map),
    dependencies,
  };
}

// What a module imports, by specifier, once each, as TypeScript reads it.
function specifiers(
  ts: typeof import("typescript"),
  into: string[],
): ts.TransformerFactory<ts.SourceFile> {
  return () => (sourceFile) => {
    for (const statement of sourceFile.statements) {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        !into.includes(statement.moduleSpecifier.text)
      ) {
        into.push(statement.moduleSpecifier.text);
      }
    }
    return sourceFile;
  };
}

// A script's map with its one source, the host file, named `sourceName`.
function renamed(map: string, sourceName: string): string {
  const parsed = JSON.parse(map) as object;
  return JSON.stringify({ ...parsed, sources: [sourceName] });
}

// A map whose code moved down a line, as code does that a wrapper starts on a
// line of its own.
function down(map: string): string {
  const parsed = JSON.parse(map) as { mappings: string };
  return JSON.stringify({ ...parsed, mappings: `;${parsed.mappings}` });
}
