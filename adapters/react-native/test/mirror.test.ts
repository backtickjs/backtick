import assert from "node:assert/strict";
import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import ts from "typescript";
import * as main from "../dist/index.js";

const reactNative = realpathSync(
  join(import.meta.dirname, "..", "node_modules", "react-native"),
);

// What React Native exports at runtime: the keys of `index.js`'s
// `module.exports = { … }`, read rather than run, as its code is Flow's and
// a device's.
function exported(): string[] {
  const file = ts.createSourceFile(
    "index.ts",
    readFileSync(join(reactNative, "index.js"), "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  let keys: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isBinaryExpression(node) &&
      node.left.getText(file) === "module.exports"
    ) {
      let right = node.right;
      while (ts.isAsExpression(right) || ts.isParenthesizedExpression(right)) {
        right = right.expression;
      }
      if (ts.isObjectLiteralExpression(right)) {
        keys = right.properties.map((property) => property.name!.getText(file));
      }
    }
    node.forEachChild(visit);
  };
  visit(file);
  return keys;
}

// The names a module's declarations export, values flagged.
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

describe("react-native, mirrored", () => {
  const runtime = exported();
  const declarations = declared(join(reactNative, "types", "index.d.ts"));

  it("reads React Native's exports", () => {
    assert.ok(runtime.includes("View") && runtime.includes("StyleSheet"));
  });

  it("names what React Native exports and declares, under the name it is required as", () => {
    const values = Object.keys(main).sort();
    const both = runtime
      .filter((name) => declarations.get(name) === true)
      .sort();
    assert.deepEqual(values, both);
    for (const [name, value] of Object.entries(main)) {
      assert.ok(isClientImport(value), `${name} is a client import`);
      assert.equal(value.name, name);
      assert.equal(value.from, "react-native");
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
