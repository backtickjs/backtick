import assert from "node:assert/strict";
import { realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import ts from "typescript";
import * as main from "../dist/index.js";

const root = realpathSync(
  join(import.meta.dirname, "..", "node_modules", "react-error-boundary"),
);

// Its ES build, which bundlers resolve: Node, with no `exports` to choose by,
// loads the CommonJS one, whose namespace adds `default` and `module.exports`.
const ReactErrorBoundary = (await import(
  join(root, "dist/react-error-boundary.js")
)) as Record<string, unknown>;

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

describe("react-error-boundary, mirrored", () => {
  it("names every value react-error-boundary exports, under the name it is required as", () => {
    assert.deepEqual(
      Object.keys(main).sort(),
      Object.keys(ReactErrorBoundary).sort(),
    );
    for (const [name, value] of Object.entries(main)) {
      assert.ok(isClientImport(value), `${name} is a client import`);
      assert.equal(value.name, name);
      assert.equal(value.from, "react-error-boundary");
    }
  });

  it("names every name its declarations export", () => {
    const mirrored = declared(
      join(import.meta.dirname, "..", "src", "index.ts"),
    );
    for (const name of declared(join(root, "dist/react-error-boundary.d.ts"))) {
      assert.ok(mirrored.has(name), name);
    }
  });
});
