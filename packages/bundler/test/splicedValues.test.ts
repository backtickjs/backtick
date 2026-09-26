import assert from "node:assert/strict";
import { test } from "node:test";
import { bundler } from "../dist/bundler.js";

// The module as the bundler prints it, before any framework compiles it.
const transform = (code: string) => ({ code, map: "" });

test("a plain object crosses member by member", async () => {
  assert.match(
    await bundler.run({ label: "row", count: 3 }, { transform }),
    /export default \(\) => \(\{ label: "row", count: 3 \}\);/,
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
    () => bundler.run(new Point() as never, { transform }),
    /only plain objects cross into a client script/,
  );
});

test("a host function expands rather than crossing", async () => {
  // It has no data form, so it is run against a hole per parameter and what it
  // answered is what crosses. `length` is the arity, so this one takes one.
  assert.match(
    await bundler.run(((n: never) => n) as never, { transform }),
    /export default \(\) => \(\(\$arg0\) => \(\$arg0\)\);/,
  );
});
