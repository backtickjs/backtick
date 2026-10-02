import type { BundleTree } from "../bundle/buildBundle.js";
import type { ClientScript } from "@backtickjs/core";
import { importDeclaration, string } from "./code.js";

const MODULE_ID = "bundle.jsx";

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
 * bundled, as its scripts wrote it. The export is how the value is found again
 * once plugins have transformed the module (they may add statements after it);
 * what a caller gets is `generate`'s, in the format they asked for.
 *
 * The module is its imports, a module table of its scripts, and the root. A
 * script's JSX, where its framework didn't compile it when its host was built,
 * is kept for the framework's compiler to compile as it compiles any module.
 * Its imports are the client's to resolve, through an import map in a page.
 *
 * Its map leads into the host files its scripts were written in: an index
 * map, each script's own map a section where the script stands. What the
 * bundler wrote around the scripts maps to nothing, since no source wrote it.
 */
export function printBundle(tree: BundleTree): { code: string; map: string } {
  const { names } = tree;
  const module = new ModuleWriter();
  for (const { from, name, local } of names.imports.values()) {
    module.line(importDeclaration(from, name, local));
  }
  // Each script a module table's entry, as webpack's and Metro's are: its body
  // under its id, run once by `$require`. The modules they require are the
  // client's, each imported whole, once.
  const scripts = new Map(
    tree.scripts.map(([, script]) => [script.id, script]),
  );
  const dependencies = [
    ...new Set([...scripts.values()].flatMap((script) => script.dependencies)),
  ];
  dependencies.forEach((specifier, index) =>
    module.line(`import * as $module${index} from ${string(specifier)};`),
  );
  module.line("const $modules = {");
  for (const [id, script] of scripts) {
    module.write(`${string(id)}: `);
    module.script(script);
    module.line(",");
  }
  module.line("};");
  module.line("const $exports = {");
  dependencies.forEach((specifier, index) =>
    module.line(`${string(specifier)}: $module${index},`),
  );
  module.line("};");
  module.line(RUNTIME);
  for (const [label, script] of tree.scripts) {
    module.line(`const ${label} = $require(${string(script.id)}).default;`);
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
  script({ code, map }: ClientScript): void {
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
