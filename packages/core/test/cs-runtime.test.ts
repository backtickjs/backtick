import assert from "node:assert/strict";
import { test } from "node:test";
import { cs, isSpliceable } from "../dist/cs-runtime/index.js";
import { buildAst } from "../dist/jit-bundler/index.js";

test("cs`...` throws when used without the compiler", () => {
  assert.throws(() => cs`"Hello World!"`, /was not compiled/);
});

test("cs.lift throws when called directly", () => {
  assert.throws(() => cs.lift("Hello World!"), /Don't call `cs\.lift`/);
});

test("cs.lower throws when called directly", () => {
  assert.throws(() => cs.lower("Hello World!"), /Don't call `cs\.lower`/);
});

test("isSpliceable accepts primitives, clients, and containers of them", () => {
  assert.equal(isSpliceable(null), true);
  assert.equal(isSpliceable(3), true);
  assert.equal(isSpliceable(true), true);
  assert.equal(isSpliceable("Hello World!"), true);
  assert.equal(isSpliceable({ "@backtickjs": "ClientObject" }), true);
  assert.equal(isSpliceable([1, "two", [true, null]]), true);
  assert.equal(isSpliceable({ a: 1, b: { c: [2] } }), true);
  assert.equal(isSpliceable(Object.create(null)), true);
});

test("isSpliceable rejects host-only values, including nested ones", () => {
  assert.equal(isSpliceable(undefined), false);
  assert.equal(
    isSpliceable(() => 1),
    false,
  );
  assert.equal(isSpliceable(new Date(0)), false);
  assert.equal(isSpliceable([1, () => 2]), false);
  assert.equal(isSpliceable({ a: { b: undefined } }), false);
});

test("a reflected instance keeps spliceable members, own or inherited", () => {
  class Base {
    readonly "@backtickjs" = "ClientObject";

    get inherited() {
      return "base";
    }

    get shadowed() {
      return "base";
    }
  }

  class Derived extends Base {
    field = 3;
    hostOnly = () => 1;

    get shadowed() {
      return "derived";
    }

    method() {
      return 1;
    }
  }

  assert.deepEqual(buildAst(new Derived()), {
    kind: "AstObject",
    entries: {
      field: { kind: "AstNumber", value: 3 },
      shadowed: { kind: "AstString", value: "derived" },
      inherited: { kind: "AstString", value: "base" },
    },
  });
});
