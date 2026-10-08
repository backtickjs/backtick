import assert from "node:assert/strict";
import { test } from "node:test";
import { isSupportedNode } from "../src/nodeVersion.ts";

test("Node 22.15+, 24.3+ and 25+ are supported; 23 and older 22s aren't", () => {
  for (const version of [
    "22.15.0",
    "22.20.1",
    "24.3.0",
    "24.11.0",
    "25.0.0",
    "26.1.0",
  ]) {
    assert.ok(isSupportedNode(version), version);
  }
  for (const version of ["20.19.4", "22.14.0", "23.10.0", "24.2.0"]) {
    assert.ok(!isSupportedNode(version), version);
  }
});
