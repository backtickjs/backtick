import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import ts from "typescript";
import * as client from "../dist/client.js";
import * as main from "../dist/index.js";
import { react } from "../dist/plugin.js";

// What a page's import map maps: each module a bundle may import.
const modules = ["react", "react-dom/client", "react/jsx-runtime"];

const load = (from: string): Promise<Record<string, unknown>> => import(from);

// Each of the adapter's modules, the React module it mirrors, and the
// declarations React ships for that module.
const mirrors = [
  {
    module: "react",
    ours: main,
    source: "index.ts",
    types: /@types\/react\/index\.d\.ts$/,
  },
  {
    module: "react-dom/client",
    ours: client,
    source: "client.ts",
    types: /@types\/react-dom\/client\.d\.ts$/,
  },
];

// Exported by React's build but not declared, so not typed: its internals,
// and an unstable hook.
const undeclared = (name: string) =>
  name.startsWith("__") || name === "unstable_useCacheRefresh";

const vocabulary = Object.assign({}, main, client);

for (const { module, ours, source, types } of mirrors) {
  describe(`${module}, mirrored`, () => {
    it("names what its module exports, under the name it is imported as", async () => {
      for (const [name, value] of Object.entries(ours)) {
        assert.ok(isClientImport(value), `${name} is a client import`);
        assert.equal(value.name, name);
        assert.ok(
          name in (await load(value.from)),
          `${value.from} has ${name}`,
        );
      }
    });

    it("names every value it exports", async () => {
      for (const name of Object.keys(await load(module))) {
        // `default` and `module.exports` are Node's view of a CommonJS
        // module, not exports.
        if (
          name === "default" ||
          name === "module.exports" ||
          undeclared(name)
        ) {
          continue;
        }
        // Exported by `react-dom/client`'s build but not declared there.
        if (module === "react-dom/client" && name === "version") {
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
      const names = (symbol: ts.Symbol) =>
        checker.getExportsOfModule(symbol).map(({ name }) => name);
      const mirrored = names(
        checker.getSymbolAtLocation(
          program.getSourceFile(program.getRootFileNames()[0]!)!,
        )!,
      );
      const declared = program
        .getSourceFiles()
        .find(({ fileName }) => types.test(fileName))!;
      // `export =`: React's names are its namespace's.
      const symbol = checker.getSymbolAtLocation(declared)!;
      const exported = checker.resolveExternalModuleSymbol(symbol);
      for (const name of names(exported)) {
        assert.ok(mirrored.includes(name), name);
      }
    });
  });
}

// A page's import map must cover everything a bundle imports: the
// vocabulary's imports, and what React's JSX transform writes imports of.
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

  it("maps what React's JSX transform imports", () => {
    const { code } = react()(
      "export default () => <button onClick={() => {}}>{String(1)}</button>;",
      "imports.jsx",
    );
    const written = [...code.matchAll(/^import .* from "([^"]+)";$/gm)].map(
      ([, from]) => from!,
    );
    assert.deepEqual(written, ["react/jsx-runtime"]);
  });
});
