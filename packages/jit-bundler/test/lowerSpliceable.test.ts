import assert from "node:assert/strict";
import { test } from "node:test";
import { lowerSpliceable } from "../dist/ast/lowerSpliceable.js";

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

  assert.deepEqual(lowerSpliceable(new Derived(), "ClientUnknown"), {
    kind: "AstObject",
    entries: {
      field: { kind: "AstNumber", value: 3 },
      shadowed: { kind: "AstString", value: "derived" },
      inherited: { kind: "AstString", value: "base" },
    },
  });
});
