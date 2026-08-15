import assert from "node:assert/strict";
import { test } from "node:test";
import { lowerSpliceable } from "../dist/ast/lowerSpliceable.js";

test("a plain object crosses member by member", async () => {
  assert.deepEqual(
    await lowerSpliceable({ label: "row", count: 3 }, "ClientUnknown"),
    {
      kind: "AstObject",
      entries: {
        label: { kind: "AstString", value: "row" },
        count: { kind: "AstNumber", value: 3 },
      },
    },
  );
});

test("a class instance does not", async () => {
  // Own fields would cross and everything else — getters, methods — would
  // silently vanish, so it fails loudly instead. An object with behaviour is
  // built by a client function: `state` for what it holds, arrows for what may
  // be done to it.
  class Point {
    readonly x = 1;
    get y() {
      return 2;
    }
  }

  await assert.rejects(
    () => lowerSpliceable(new Point() as never, "ClientUnknown"),
    /only plain objects cross into a client script/,
  );
});

test("nor does a host function", async () => {
  await assert.rejects(
    () => lowerSpliceable((() => null) as never, "ClientUnknown"),
    /client code is written in/,
  );
});
