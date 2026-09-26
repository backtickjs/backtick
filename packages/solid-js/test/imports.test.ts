import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isClientImport } from "@backtickjs/core";
import * as imports from "../dist/index.js";

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
