import { addMapping, GenMapping, toEncodedMap } from "@jridgewell/gen-mapping";
import { eachMapping, TraceMap } from "@jridgewell/trace-mapping";
import type { BundleTree } from "../bundle/buildBundle.js";
import type { ClientScript } from "@backtickjs/core";
import { importDeclaration } from "./code.js";

const MODULE_ID = "bundle.jsx";

/**
 * A bundle tree as a module whose default export is the tree's root: the value
 * bundled, as its scripts wrote it. The export is how the value is found again
 * once plugins have transformed the module (they may add statements after it);
 * what a caller gets is `generate`'s, in the format they asked for.
 *
 * The module is JSX: its imports, each script, and the root, for the
 * framework's compiler to compile as it compiles any module; its imports are
 * the client's to resolve, through an import map in a page.
 *
 * Its map leads into the host files its scripts were written in: each
 * script's own map, moved to where the script stands in the module. What the
 * bundler wrote around the scripts maps to nothing, since no source wrote it.
 */
export function printBundle(tree: BundleTree): { code: string; map: string } {
  const { names } = tree;
  const module = new ModuleWriter();
  for (const { from, name, local } of names.imports.values()) {
    module.line(importDeclaration(from, name, local));
  }
  // A component whose body is the function it is handed: what draws a script
  // a component drew (see `componentElement`). Declared where one is.
  if (names.usesComponent) {
    module.line("const $Component = (props) => props.body();");
  }
  for (const [label, script] of tree.scripts) {
    module.write(`const ${label} = `);
    module.script(script);
    module.line(";");
  }
  // Each host function the bundle expanded, declared once however many places
  // name it.
  for (const [label, code] of tree.expansions) {
    module.line(`const ${label} = ${code};`);
  }
  // Parenthesized, so a root that is a function isn't a declaration.
  module.write(`export default (${tree.root});`);

  return { code: module.code, map: module.map() };
}

// The module's code as it is written, and a map of the scripts in it.
class ModuleWriter {
  code = "";
  #line = 0;
  #column = 0;
  #map = new GenMapping({ file: MODULE_ID });

  write(text: string): void {
    this.code += text;
    const lines = text.split("\n");
    if (lines.length > 1) {
      this.#line += lines.length - 1;
      this.#column = lines[lines.length - 1]!.length;
    } else {
      this.#column += text.length;
    }
  }

  line(text: string): void {
    this.write(`${text}\n`);
  }

  // A script's code, with its map's segments moved to where it stands: its
  // first line by where it starts on this one, the rest by line alone.
  script({ code, map }: ClientScript): void {
    const line = this.#line;
    const start = this.#column;
    eachMapping(new TraceMap(map), (segment) => {
      if (segment.source === null) {
        return;
      }
      const first = segment.generatedLine === 1;
      addMapping(this.#map, {
        generated: {
          line: line + segment.generatedLine,
          column: (first ? start : 0) + segment.generatedColumn,
        },
        source: segment.source,
        original: {
          line: segment.originalLine,
          column: segment.originalColumn,
        },
      });
    });
    this.write(code);
  }

  map(): string {
    return JSON.stringify(toEncodedMap(this.#map));
  }
}
