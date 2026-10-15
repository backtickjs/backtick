import assert from "node:assert/strict";
import { realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import * as ReactQuery from "@tanstack/react-query";
import ts from "typescript";
import * as main from "../dist/index.js";

const root = realpathSync(
  join(import.meta.dirname, "..", "node_modules", "@tanstack", "react-query"),
);

// The names a module's declarations export.
function declared(source: string): Set<string> {
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
  return new Set(checker.getExportsOfModule(symbol).map((each) => each.name));
}

describe("@tanstack/react-query, mirrored", () => {
  // It runs in Node, so what it exports at runtime is its values; some
  // classes it declares (`FocusManager`) are exported as types only.
  it("names every value @tanstack/react-query exports, under the name it is required as", () => {
    assert.deepEqual(Object.keys(main).sort(), Object.keys(ReactQuery).sort());
    for (const [name, value] of Object.entries(main)) {
      assert.ok(isClientImport(value), `${name} is a client import`);
      assert.equal(value.name, name);
      assert.equal(value.from, "@tanstack/react-query");
    }
  });

  it("names every name its declarations export", () => {
    const mirrored = declared(
      join(import.meta.dirname, "..", "src", "index.ts"),
    );
    for (const name of declared(join(root, "build/modern/index.d.ts"))) {
      assert.ok(mirrored.has(name), name);
    }
  });
});
