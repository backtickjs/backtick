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

test("a host function expands rather than crossing", async () => {
  // It has no data form, so it is run against a hole per parameter and what it
  // answered is what crosses, declared once. `length` is the arity, so this
  // one takes one.
  assert.equal(
    await es((n: never) => n),
    ["const $expn0 = () => (($arg0) => ($arg0));", "export default ($expn0());"].join("\n"),
  );
});

test("a host function answering one hands it its argument", async () => {
  // The inner function reads the outer one's argument: a capture of its
  // declaration, so the two never shadow each other.
  assert.equal(
    await es((n: never) => (m: never) => [n, m]),
    [
      "const $expn0 = () => (($arg0) => ($expn1($arg0)));",
      "const $expn1 = ($capture0) => (($arg0) => ([$capture0, $arg0]));",
      "export default ($expn0());",
    ].join("\n"),
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
  await es([counted, counted]);
  assert.equal(runs, 1);
  await es(counted);
  assert.equal(runs, 2);
});

test("host code can't compute with an argument", async () => {
  // The argument is a hole: the client has its value, so arithmetic on it has
  // to be written in a script.
  await assert.rejects(
    () => es((n: number) => n + 1),
    /Can't compute with `\$arg0` on the host/,
  );
  await assert.rejects(
    () =>
      es((props: { count: number }) => (props.count > 5 ? "many" : "few")),
    /Can't compute with `\$arg0\.count` on the host/,
  );
});
