import type { BundleTree } from "../bundle/buildBundle.js";
import type { ClientModule } from "@backtickjs/core";
import { importDeclaration, requireDeclaration, string } from "./code.js";

const MODULE_ID = "bundle.js";

// A module table's `require`: a module's exports, its entry run the first time
// it is asked for.
const RUNTIME = `const $require = (id) => {
  if (!(id in $exports)) {
    const module = { exports: {} };
    $exports[id] = module.exports;
    $modules[id](module, module.exports, $require);
    $exports[id] = module.exports;
  }
  return $exports[id];
};`;

/**
 * A bundle tree as a module whose default export is the tree's root: the value
 * bundled, as its scripts wrote it.
 *
 * The module is its imports, a module table of its scripts, each compiled for
 * its framework when its host was built, and the root. Its imports are the
 * client's to resolve. As an ES module (`"es"`), a page resolves them through
 * an import map; as CommonJS (`"cjs"`), whatever runs it hands it `require`,
 * as a React Native app does for the packages it was built with.
 *
 * Its map leads into the host files its scripts were written in: an index
 * map, each script's own map a section where the script stands. What the
 * bundler wrote around the scripts maps to nothing, since no source wrote it.
 */
export function printBundle(
  tree: BundleTree,
  format: "es" | "cjs",
): { code: string; map: string } {
  const { names } = tree;
  const module = new ModuleWriter();
  if (format === "cjs") {
    // An ES module is strict code, and so are the scripts; CommonJS isn't.
    module.line('"use strict";');
  }
  const declaration = format === "es" ? importDeclaration : requireDeclaration;
  for (const { from, name, local } of names.imports.values()) {
    module.line(declaration(from, name, local));
  }
  // Each script a module table's entry, as webpack's and Metro's are: its body
  // under its id, run once by `$require`. The modules they require are the
  // client's, each imported whole, once.
  const modules = new Map(tree.modules.map(([, entry]) => [entry.id, entry]));
  const dependencies = [
    ...new Set([...modules.values()].flatMap((entry) => entry.dependencies)),
  ];
  dependencies.forEach((specifier, index) =>
    module.line(
      format === "es"
        ? `import * as $module${index} from ${string(specifier)};`
        : `const $module${index} = require(${string(specifier)});`,
    ),
  );
  module.line("const $modules = {");
  for (const [id, entry] of modules) {
    module.write(`${string(id)}: `);
    module.script(entry);
    module.line(",");
  }
  module.line("};");
  module.line("const $exports = {");
  dependencies.forEach((specifier, index) =>
    module.line(`${string(specifier)}: $module${index},`),
  );
  module.line("};");
  module.line(RUNTIME);
  for (const [label, entry] of tree.modules) {
    module.line(`const ${label} = $require(${string(entry.id)}).default;`);
  }
  for (const [label, code] of tree.functions) {
    module.line(`const ${label} = ${code};`);
  }
  // Parenthesized, so a root that is a function isn't a declaration.
  module.write(
    format === "es"
      ? `export default (${tree.root});`
      : `module.exports = (${tree.root});`,
  );

  return { code: module.code, map: module.map() };
}

// The module's code as it is written, and a map of the scripts in it.
class ModuleWriter {
  code = "";
  #line = 0;
  #column = 0;
  #sections: { offset: { line: number; column: number }; map: object }[] = [];

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

  // A script's code, its map a section of the module's where it starts.
  script({ code, map }: ClientModule): void {
    this.#sections.push({
      offset: { line: this.#line, column: this.#column },
      map: JSON.parse(map) as object,
    });
    this.write(code);
  }

  // An index map: each script's own map, at its offset, decoded by no one here.
  map(): string {
    return JSON.stringify({
      version: 3,
      file: MODULE_ID,
      sections: this.#sections,
    });
  }
}
