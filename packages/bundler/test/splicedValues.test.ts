import assert from "node:assert/strict";
import { test } from "node:test";
import { bundler } from "../dist/bundler.js";

test("a plain object crosses member by member", async () => {
  assert.match(
    (await bundler.run({ label: "row", count: 3 })).code,
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
    () => bundler.run(new Point() as never),
    /only plain objects cross into a client script/,
  );
});

test("a host function expands rather than crossing", async () => {
  // It has no data form, so it is run against a hole per parameter and what it
  // answered is what crosses. `length` is the arity, so this one takes one.
  assert.match(
    (await bundler.run(((n: never) => n) as never)).code,
    /export default \(\) => \(\(\$arg0\) => \(\$arg0\)\);/,
  );
});

test("a host function expands once per bundle", async () => {
  // Its host code runs while bundling, so what it computes is the bundle's:
  // two splices in one bundle share one run, and the next bundle runs it again.
  let runs = 0;
  const counted = (n: never) => {
    runs += 1;
    return n;
  };
  await bundler.run([counted, counted] as never);
  assert.equal(runs, 1);
  await bundler.run(counted as never);
  assert.equal(runs, 2);
});
