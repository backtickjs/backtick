import assert from "node:assert/strict";
import { realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import * as Three from "three";
import ts from "typescript";
import * as main from "../dist/index.js";

const types = realpathSync(
  join(import.meta.dirname, "..", "node_modules", "@types", "three"),
);

// The names a module's declarations export, each flagged when the module's
// value has it: `export type { X }` of a class declares no value.
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
  const values = new Set(
    checker
      .getPropertiesOfType(checker.getTypeOfSymbol(symbol))
      .map((each) => each.name),
  );
  return new Map(
    checker
      .getExportsOfModule(symbol)
      .map((each) => [each.name, values.has(each.name)]),
  );
}

describe("three, mirrored", () => {
  const runtime = Object.keys(Three);
  const declarations = declared(join(types, "index.d.ts"));

  it("reads three's exports", () => {
    assert.ok(runtime.includes("Mesh") && runtime.includes("Vector3"));
  });

  it("names what three exports and declares, under the name it is required as", () => {
    const values = Object.keys(main).sort();
    const both = runtime
      .filter((name) => declarations.get(name) === true)
      .sort();
    assert.deepEqual(values, both);
    for (const [name, value] of Object.entries(main)) {
      assert.ok(isClientImport(value), `${name} is a client import`);
      assert.equal(value.name, name);
      assert.equal(value.from, "three");
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
