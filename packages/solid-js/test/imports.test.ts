import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, isClientImport } from "@backtickjs/core";
import { solid } from "../dist/plugin.js";
import * as main from "../dist/index.js";
import * as store from "../dist/store.js";
import * as web from "../dist/web.js";
import ts from "typescript";

// The Solid these tests' client loads: the installed one.
const { version: solidVersion } = JSON.parse(
  readFileSync(new URL(import.meta.resolve("solid-js/package.json")), "utf8"),
) as { version: string };

// What a page's import map maps, as the examples write it: each module a
// bundle may import, by the file in the `solid-js` package that is its browser
// build.
const browserBuilds: Record<string, string> = {
  "solid-js": "dist/solid.js",
  "solid-js/web": "web/dist/web.js",
  "solid-js/store": "store/dist/store.js",
};
const modules = Object.keys(browserBuilds);

// A module as a page loads it: its browser build, in the installed package,
// not the server build Node resolves `solid-js` to.
const load = (from: string): Promise<Record<string, unknown>> =>
  import(import.meta.resolve(`solid-js/${browserBuilds[from]}`));

// Each of the adapter's modules, the Solid module it mirrors, and the
// declarations Solid ships for that module.
const mirrors = [
  {
    module: "solid-js",
    ours: main,
    source: "index.ts",
    types: /solid-js\/types\/index\.d\.ts$/,
  },
  {
    module: "solid-js/store",
    ours: store,
    source: "store.ts",
    types: /solid-js\/store\/types\/index\.d\.ts$/,
  },
  {
    module: "solid-js/web",
    ours: web,
    source: "web.ts",
    types: /solid-js\/web\/types\/index\.d\.ts$/,
  },
];

// Every client import the adapter exports, from any of its modules.
const vocabulary = Object.assign({}, main, store, web);

for (const { module, ours, source, types } of mirrors) {
  describe(`${module}, mirrored`, () => {
    it("names what its module exports, under the name it is imported as", async () => {
      for (const [name, value] of Object.entries(ours)) {
        assert.ok(isClientImport(value), `${name} is a client import`);
        assert.equal(value.name, name);
        // `in`, not a value: `DEV` is `undefined` outside Solid's dev build.
        assert.ok(
          name in (await load(value.from)),
          `${value.from} has ${name}`,
        );
      }
    });

    it("names every value it exports", async () => {
      for (const name of Object.keys(await load(module))) {
        // Exported by the browser build but not declared, so not typed.
        if (module === "solid-js/web" && name === "innerHTML") {
          continue;
        }
        assert.ok(name in ours, name);
      }
    });

    it("names every name its declarations export", () => {
      const program = ts.createProgram(
        [join(import.meta.dirname, "..", "src", source)],
        {
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          module: ts.ModuleKind.NodeNext,
          moduleResolution: ts.ModuleResolutionKind.NodeNext,
          types: [],
        },
      );
      const checker = program.getTypeChecker();
      const names = (file: ts.SourceFile) =>
        checker
          .getExportsOfModule(checker.getSymbolAtLocation(file)!)
          .map(({ name }) => name);
      const mirrored = names(
        program.getSourceFile(program.getRootFileNames()[0]!)!,
      );
      const declared = program
        .getSourceFiles()
        .find(({ fileName }) => types.test(fileName))!;
      for (const name of names(declared)) {
        // Declared but not in the browser build: server APIs.
        if (module === "solid-js/web" && name.startsWith("pipeTo")) {
          continue;
        }
        assert.ok(mirrored.includes(name), name);
      }
    });
  });
}

// A page's import map must cover everything a bundle imports: the
// vocabulary's imports, and what Solid's compiler writes imports of.
describe("a page's import map", () => {
  it("maps every import's module", () => {
    for (const [name, value] of Object.entries(vocabulary)) {
      assert.ok(isClientImport(value));
      assert.ok(
        modules.includes(value.from),
        `${name} is from "${value.from}"`,
      );
    }
  });

  it("maps what Solid's compiler imports", async () => {
    // A drawing with an event: templates, insertion, and delegated events. A
    // script as the compiler writes one, as this file isn't compiled.
    const drawing = cs.create(
      "imports:1:0",
      { params: [] },
      "(module, exports, require) => {\nexports.default = () => <button onclick={() => {}}>{String(1)}</button>;\n}",
      '{"version":3,"sources":[],"names":[],"mappings":""}',
      [],
    );
    const bundle = await bundler.build({
      input: drawing,
      external: { "solid-js": solidVersion },
      plugins: [solid()],
    });
    const { code } = bundle.generate({ format: "es" });
    const written = [...code.matchAll(/^import .* from "([^"]+)";$/gm)].map(
      ([, from]) => from!,
    );
    assert.ok(written.includes("solid-js/web"));
    for (const from of written) {
      assert.ok(modules.includes(from), from);
    }
  });
});
