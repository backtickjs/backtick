import { expect, test } from "bun:test";
// Registers the plugin for the imports below.
import "../src/index.ts";

test("a file with a script the compiler refuses fails to load", async () => {
  await expect(import("./fixtures/refused.ts")).rejects.toThrow(
    /refused\.ts\(4,9\): error TS0: `\$`-prefixed names are reserved/,
  );
});

test("a file whose scripts compile loads", async () => {
  const { script } = await import("./fixtures/accepted.ts");
  expect(script).toBeDefined();
});

test("a compiled file's text past ASCII loads as written", async () => {
  const { icon } = await import("./fixtures/unicode.ts");
  expect(icon).toBe("🏡 café");
});

test("a stack trace points at the line written, in the file written", async () => {
  const { throwsOnLine6, throwsOnLine7 } = await import("./fixtures/stack.ts");
  for (const [fail, line] of [
    [throwsOnLine6, 6],
    [throwsOnLine7, 7],
  ] as const) {
    expect(stackOf(fail)).toContain(
      `${import.meta.dir}/fixtures/stack.ts:${line}:`,
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
