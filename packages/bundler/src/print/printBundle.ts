import type { Bundle, ClientUnknown } from "@backtickjs/platform-sdk";
import { addMapping, GenMapping, toEncodedMap } from "@jridgewell/gen-mapping";
import remapping from "@jridgewell/remapping";
import { eachMapping, TraceMap } from "@jridgewell/trace-mapping";
import type { BundleTree } from "../bundle/buildBundle.js";
import type { ClientScript } from "@backtickjs/client-script";
import { importDeclaration } from "./code.js";

/**
 * What an adapter's transform does to a bundle's module, shaped as a Vite
 * plugin's `transform`: the code and its module id in, whatever the
 * framework's compiler made of it out, with a source map (as JSON) into the
 * code it was given.
 */
export type CodeTransform = (
  code: string,
  id: string,
) => { readonly code: string; readonly map: string };

const MODULE_ID = "bundle.jsx";

/**
 * A bundle tree as a module whose default export draws the tree's root: a
 * function, so the client calls it where what it creates is owned.
 *
 * The module is JSX: its imports, each script, and the root. The adapter's
 * transform compiles it as the framework compiles any module; its imports are
 * the client's to resolve, through an import map in a page.
 *
 * With `sourceMap`, the bundle ends with its map inline, into the host files
 * its scripts were written in: each script's own map, moved to where the
 * script stands in the module, then through the transform's. What the bundler
 * wrote around the scripts maps to nothing, since no source wrote it.
 */
export function printBundle<T extends ClientUnknown>(
  tree: BundleTree,
  transform: CodeTransform,
  sourceMap: boolean,
): Bundle<T> {
  const { names } = tree;
  const module = new ModuleWriter();
  for (const { from, name, local } of names.imports.values()) {
    module.line(importDeclaration(from, name, local));
  }
  // What draws a script a component drew: a component whose body runs it.
  if (names.drawsScript) {
    module.line("const $Script = (props) => props.run();");
  }
  for (const [label, script] of tree.scripts) {
    module.write(`const ${label} = `);
    module.script(script);
    module.line(";");
  }
  module.write(`export default () => (${tree.root});`);

  const compiled = transform(module.code, MODULE_ID);
  if (!sourceMap) {
    return compiled.code as Bundle<T>;
  }
  const map = remapping([compiled.map, module.map()], () => null, {
    excludeContent: true,
  }).toString();
  return `${compiled.code}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64(map)}` as Bundle<T>;
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

// UTF-8, as a data URL's base64 reads it.
function base64(text: string): string {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
