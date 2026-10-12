import assert from "node:assert/strict";
import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import ts from "typescript";
import * as main from "../dist/index.js";
import * as native from "../dist/native.js";

const fiber = realpathSync(
  join(import.meta.dirname, "..", "node_modules", "@react-three", "fiber"),
);

// What a build of R3F exports at runtime: its `exports.Name =` lines, read
// rather than run, as the native build needs a device.
function exported(build: string): string[] {
  return [
    ...readFileSync(join(fiber, build), "utf8").matchAll(
      /^exports\.([\w$]+) =/gm,
    ),
  ].map((match) => match[1]!);
}

// The names a module's declarations export, each flagged when the module's
// value has it.
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

const entries = [
  {
    from: "@react-three/fiber",
    module: main,
    build: "dist/react-three-fiber.cjs.dev.js",
    types: "dist/react-three-fiber.cjs.d.ts",
    mirror: "index.ts",
  },
  {
    from: "@react-three/fiber/native",
    module: native,
    build: "native/dist/react-three-fiber-native.cjs.dev.js",
    types: "native/dist/react-three-fiber-native.cjs.d.ts",
    mirror: "native.ts",
  },
];

for (const { from, module, build, types, mirror } of entries) {
  describe(`${from}, mirrored`, () => {
    const runtime = exported(build);
    const declarations = declared(join(fiber, types));

    it("reads R3F's exports", () => {
      assert.ok(runtime.includes("Canvas") && runtime.includes("useFrame"));
    });

    it("names what R3F exports and declares, under the name it is required as", () => {
      const values = Object.keys(module).sort();
      const both = runtime
        .filter((name) => declarations.get(name) === true)
        .sort();
      assert.deepEqual(values, both);
      for (const [name, value] of Object.entries(module)) {
        assert.ok(isClientImport(value), `${name} is a client import`);
        assert.equal(value.name, name);
        assert.equal(value.from, from);
      }
    });

    it("names every name its declarations export", () => {
      const mirrored = declared(join(import.meta.dirname, "..", "src", mirror));
      for (const name of declarations.keys()) {
        assert.ok(mirrored.has(name), name);
      }
    });
  });
}
