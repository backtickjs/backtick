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
