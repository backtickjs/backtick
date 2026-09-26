import assert from "node:assert/strict";
import { test } from "node:test";
import { cs } from "../dist/cs.js";

test("cs`...` throws when used without the compiler", () => {
  assert.throws(() => cs`"Hello World!"`, /was not compiled/);
});

test("cs.lift throws when called directly", () => {
  assert.throws(() => cs.lift("Hello World!"), /Don't call `cs\.lift`/);
});

test("cs.splice throws when called directly", () => {
  assert.throws(() => cs.splice("Hello World!"), /Don't call `cs\.splice`/);
});
