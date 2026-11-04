import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { phoneModules, phoneVersions } from "../src/function/modules.ts";

describe("the phone's modules", () => {
  it("name each phone module's exact version, for the model to write against", () => {
    for (const specifier of phoneModules) {
      assert.match(
        phoneVersions[specifier] ?? "",
        /^\d+\.\d+\.\d+$/,
        specifier,
      );
    }
    // a subpath is its package's
    assert.equal(phoneVersions["react/jsx-runtime"], phoneVersions["react"]);
  });
});
