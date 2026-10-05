import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

// The plugin is registered by `--import`, as a project registers it.

test("a file with a script the compiler refuses fails to load", async () => {
  await assert.rejects(
    import("./fixtures/refused.ts"),
    /refused\.ts\(4,9\): error TS0: `\$`-prefixed names are reserved/,
  );
});

test("a file whose scripts compile loads", async () => {
  const { script } = await import("./fixtures/accepted.ts");
  assert.notEqual(script, undefined);
});

test("a .tsx file compiles, and a `.js` import finds it", async () => {
  const { answer } = await import("./fixtures/imports.ts");
  assert.equal(answer, 42);
});

test("a .tsx entry starts in a package that isn't an ES module one", () => {
  // Run as a project runs its server, in a process of its own: Node takes the
  // entry for CommonJS, then finds its `import`s.
  const plugin = fileURLToPath(new URL("../dist/index.js", import.meta.url));
  const main = fileURLToPath(
    new URL("./fixtures/commonjs/main.tsx", import.meta.url),
  );
  const { status, stdout, stderr } = spawnSync(
    process.execPath,
    ["--import", plugin, main],
    { encoding: "utf8" },
  );
  assert.equal(stderr, "");
  assert.equal(status, 0);
  assert.equal(stdout, "42\n");
});

test("a stack trace points at the line written, in the file written", async () => {
  const { throwsOnLine6, throwsOnLine7 } = await import("./fixtures/stack.ts");
  for (const [fail, line] of [
    [throwsOnLine6, 6],
    [throwsOnLine7, 7],
  ] as const) {
    const stack = stackOf(fail);
    assert.ok(
      stack.includes(`${import.meta.dirname}/fixtures/stack.ts:${line}:`),
      stack,
    );
  }
});

function stackOf(fail: () => void): string {
  try {
    fail();
  } catch (error) {
    return (error as Error).stack ?? "";
  }
  return "";
}
