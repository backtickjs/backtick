import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createRuntime } from "../dist/index.js";

const installedPackages = { react: "19.2.3", "@facebook/sdk": "13.4.3" };

describe("a runtime's modules", () => {
  const moduleMap = {
    react: {},
    "react/jsx-runtime": {},
    "@facebook/sdk/login": {},
  };

  it("are its module map's, at its packages' installed versions", () => {
    assert.deepEqual(createRuntime({ moduleMap, installedPackages }).modules, {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
      "@facebook/sdk/login": "13.4.3",
    });
  });

  it("need every package's version, or the app throws as it starts", () => {
    assert.throws(
      () =>
        createRuntime({ moduleMap, installedPackages: { react: "19.2.3" } }),
      /offers "@facebook\/sdk\/login", but @facebook\/sdk isn't in package\.json's dependencies/,
    );
  });
});
