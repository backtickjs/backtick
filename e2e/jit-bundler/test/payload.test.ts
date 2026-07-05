import { expect, test } from "bun:test";
import { cs } from "@backtickjs/core";
import { buildPayload, printPayload } from "@backtickjs/core/jit-bundler";

// End-to-end tests for the jit-bundler: they author real `cs\`...\`` scripts and
// let the bun plugin (preloaded via bunfig.toml) compile them at import time, so
// the full compile -> runtime -> bundler path is exercised with no build step.

test("hoists each nested script into its own table entry", () => {
  const script = cs`{
    const x = 0;
    return ${cs`x`};
  }`;

  expect(printPayload(buildPayload(script))).toBe(
    [
      "functions {",
      "  0: () => {",
      "    x = 0;",
      "    return ${...};",
      "  }",
      "  1: (x) => x",
      "}",
      "root #0(#1())",
    ].join("\n"),
  );
});

test("deduplicates scripts by source location", () => {
  // A single `cs\`7\`` literal spliced twice is one client script, so it gets
  // one table entry referenced twice from the root.
  const leaf = cs`7`;
  const script = cs`({ a: ${leaf}, b: ${leaf} })`;

  expect(printPayload(buildPayload(script))).toBe(
    [
      "functions {",
      "  0: () => ({a: ${...}, b: ${...}})",
      "  1: () => 7",
      "}",
      "root #0(#1(), #1())",
    ].join("\n"),
  );
});

test("lowers runtime values spliced alongside scripts", () => {
  const script = cs`({ list: ${[1, "two", true, null]}, obj: ${{ k: 3 }} })`;

  expect(printPayload(buildPayload(script))).toBe(
    [
      "functions {",
      "  0: () => ({list: ${...}, obj: ${...}})",
      "}",
      'root #0([1, "two", true, null], ({k: 3}))',
    ].join("\n"),
  );
});
