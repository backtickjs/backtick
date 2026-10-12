import assert from "node:assert/strict";
import { realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import ts from "typescript";
import * as main from "../dist/index.js";

const root = realpathSync(
  join(import.meta.dirname, "..", "node_modules", "expo-crypto"),
);

// The names a module's declarations export, values flagged. The package's
// declarations are generated from the same source as its build, and its build
// needs a device to run, so they stand in for what it exports at runtime.
function declared(source: string): Map<string, boolean> {
  const program = ts.createProgram([source], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    types: [],
  });
  const checker = program.getTypeChecker();
  const symbol = checker.getSymbolAtLocation(program.getSourceFile(source)!)!;
  return new Map(
    checker.getExportsOfModule(symbol).map((each) => {
      const target =
        each.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(each)
          : each;
      return [each.name, (target.flags & ts.SymbolFlags.Value) !== 0];
    }),
  );
}

describe("expo-crypto, mirrored", () => {
  const declarations = declared(join(root, "build/Crypto.d.ts"));

  it("names every value expo-crypto declares, under the name it is required as", () => {
    const values = [...declarations]
      .filter(([, value]) => value)
      .map(([name]) => name)
      .sort();
    assert.deepEqual(Object.keys(main).sort(), values);
    for (const [name, value] of Object.entries(main)) {
      assert.ok(isClientImport(value), `${name} is a client import`);
      assert.equal(value.name, name);
      assert.equal(value.from, "expo-crypto");
    }
  });

  it("names every name its declarations export", () => {
    const mirrored = declared(
      join(import.meta.dirname, "..", "src", "index.ts"),
    );
    for (const name of declarations.keys()) {
      assert.ok(mirrored.has(name), name);
    }
  });
});
