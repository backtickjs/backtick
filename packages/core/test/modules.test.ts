import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { modulesOf } from "../dist/index.js";

const installed = { react: "19.2.3", "@facebook/sdk": "13.4.3" };

describe("the modules a build sends", () => {
  const moduleMap = {
    react: {},
    "react/jsx-runtime": {},
    "@facebook/sdk/login": {},
  };

  it("are its module map's, at its packages' installed versions", () => {
    assert.deepEqual(modulesOf(moduleMap, installed), {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
      "@facebook/sdk/login": "13.4.3",
    });
  });

  it("need every package's version, or the app throws as it starts", () => {
    assert.throws(
      () => modulesOf(moduleMap, { react: "19.2.3" }),
      /offers "@facebook\/sdk\/login", but @facebook\/sdk isn't in package\.json's dependencies/,
    );
  });
});
