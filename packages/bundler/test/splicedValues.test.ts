import assert from "node:assert/strict";
import { test } from "node:test";
import { es } from "./es.ts";

test("a plain object crosses member by member", async () => {
  assert.match(
    await es({ label: "row", count: 3 }),
    /^export default \(\{ label: "row", count: 3 \}\);$/m,
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
    () => es(new Point() as never),
    /only plain objects cross into a client script/,
  );
});

test("a host function does not", async () => {
  // It's host code, which only runs on the host: a client function is written
  // as a script.
  await assert.rejects(
    () => es(((n: number) => n) as never),
    /Can't splice a host function: it's host code/,
  );
});
