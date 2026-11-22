import assert from "node:assert/strict";
import { test } from "node:test";
import { type Bundle, createRuntime, cs } from "@backtickjs/core";
import { bundled } from "./bundled.ts";

// A bundle, run as an app runs it, with nothing else to require.
const run = (code: string): Promise<unknown> =>
  createRuntime({ moduleMap: {}, installedPackages: {} }).exec(
    code as Bundle<unknown>,
  );

test("a plain object crosses member by member", async () => {
  assert.match(
    await bundled(cs`${{ label: "row", count: 3 }}`),
    /^const \$thunk0 = \(\) => \(\{ label: "row", count: 3 \}\);$/m,
  );
});

test("a `__proto__` key crosses as a member, not as a prototype", async () => {
  // As `JSON.parse` makes one from a user's input: an own key, which a bare or
  // quoted `__proto__:` in an object literal would turn into the prototype.
  const value = JSON.parse('{"__proto__": {"admin": true}}');
  const code = await bundled(cs`${value}`);
  assert.match(
    code,
    /^const \$thunk0 = \(\) => \(\{ \["__proto__"\]: \{ admin: true \} \}\);$/m,
  );
  const crossed = (await run(code)) as { admin?: unknown };
  assert.equal(Object.getPrototypeOf(crossed), Object.prototype);
  assert.deepEqual(Object.keys(crossed), ["__proto__"]);
  assert.equal(crossed.admin, undefined);
});

test("a string with line or paragraph separators crosses escaped", async () => {
  // Both are legal in a string since ES2019, but not to every engine that may
  // run a bundle, which would refuse the whole screen over a user's text.
  const value = "line\u2028paragraph\u2029end";
  const code = await bundled(cs`${value}`);
  assert.match(
    code,
    /^const \$thunk0 = \(\) => \("line\\u2028paragraph\\u2029end"\);$/m,
  );
  const crossed = await run(code);
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
    () => bundled(cs`${new Point() as never}`),
    /only plain objects cross into a client script/,
  );
});

test("a host function does not", async () => {
  // It's host code, which only runs on the host: a client function is written
  // as a script.
  await assert.rejects(
    () => bundled(cs`${((n: number) => n) as never}`),
    /Can't splice a host function: it's host code/,
  );
});
