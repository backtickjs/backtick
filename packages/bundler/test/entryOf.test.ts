import assert from "node:assert/strict";
import { test } from "node:test";
import { entryOf } from "../dist/bundle/entryOf.js";

test("an entry is the expression a script's module exports", () => {
  assert.deepEqual(
    entryOf({ code: "export default ($0) => <b>{$0()}</b>;", map: "{}" }),
    { code: "($0) => <b>{$0()}</b>", map: "{}", column: 15 },
  );
});

test("a module holding anything else is refused", () => {
  assert.throws(
    () => entryOf({ code: 'import "x";\nexport default 1;', map: "" }),
    /export default …;/,
  );
});
