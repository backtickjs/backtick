import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createJsxElement, isClientImport } from "@backtickjs/core";
import { compile } from "../dist/bundle.js";
import * as vocabulary from "../dist/index.js";

const { modules, ...imports } = vocabulary;

describe("Solid's API", () => {
  it("names what its module exports, under the name it is imported as", async () => {
    for (const [name, value] of Object.entries(imports)) {
      assert.ok(isClientImport(value), `${name} is a client import`);
      assert.equal(value.name, name);
      const module = await import(value.from);
      assert.notEqual(module[name], undefined, `${value.from} has ${name}`);
    }
  });
});

// What a Solid client provides must cover everything a bundle imports: the
// vocabulary's imports, and what Solid's compiler writes imports of.
describe("the modules a Solid client provides", () => {
  it("hold every import's module", () => {
    for (const [name, value] of Object.entries(imports)) {
      assert.ok(isClientImport(value));
      assert.ok(
        (modules as readonly string[]).includes(value.from),
        `${name} is from "${value.from}"`,
      );
    }
  });

  it("hold what Solid's compiler imports", async () => {
    // A drawing with an event: templates, insertion, and delegated events.
    const bundle = await bundler.build({
      input: createJsxElement("button", { onclick: imports.batch, children: ["a"] }),
      external: modules,
      plugins: [compile],
    });
    const { code } = bundle.generate({ format: "es" });
    const written = [...code.matchAll(/^import .* from "([^"]+)";$/gm)].map(
      ([, from]) => from!,
    );
    assert.ok(written.includes("solid-js/web"));
    for (const from of written) {
      assert.ok((modules as readonly string[]).includes(from), from);
    }
  });
});
