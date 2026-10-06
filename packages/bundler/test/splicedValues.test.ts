import assert from "node:assert/strict";
import { test } from "node:test";
import { es } from "./es.ts";

test("a plain object crosses member by member", async () => {
  assert.match(
    await es({ label: "row", count: 3 }),
    /^export default \(\{ label: "row", count: 3 \}\);$/m,
  );
});

test("a `__proto__` key crosses as a member, not as a prototype", async () => {
  // As `JSON.parse` makes one from a user's input: an own key, which a bare or
  // quoted `__proto__:` in an object literal would turn into the prototype.
  const value = JSON.parse('{"__proto__": {"admin": true}}');
  const code = await es(value);
  assert.match(
    code,
    /^export default \(\{ \["__proto__"\]: \{ admin: true \} \}\);$/m,
  );
  const { default: crossed } = await import(
    `data:text/javascript,${encodeURIComponent(code)}`
  );
  assert.equal(Object.getPrototypeOf(crossed), Object.prototype);
  assert.deepEqual(Object.keys(crossed), ["__proto__"]);
  assert.equal(crossed.admin, undefined);
});

test("a string with line or paragraph separators crosses escaped", async () => {
  // Both are legal in a string since ES2019, but not to every engine that may
  // run a bundle, which would refuse the whole screen over a user's text.
  const value = "line\u2028paragraph\u2029end";
  const code = await es(value);
  assert.match(code, /^export default \("line\\u2028paragraph\\u2029end"\);$/m);
  const { default: crossed } = await import(
    `data:text/javascript,${encodeURIComponent(code)}`
  );
  assert.equal(crossed, value);
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
