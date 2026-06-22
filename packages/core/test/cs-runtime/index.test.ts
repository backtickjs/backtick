import assert from "node:assert/strict";
import { test } from "node:test";
import { cs } from "../../dist/cs-runtime/index.js";

test("cs`...` throws when used without the compiler", () => {
  assert.throws(() => cs`"Hello World!"`, /was not compiled/);
});
