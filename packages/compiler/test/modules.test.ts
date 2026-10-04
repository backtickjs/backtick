import assert from "node:assert";
import { describe, it } from "node:test";
import { transpile } from "@backtickjs/compiler";
import ts from "typescript";

describe("a script's module", () => {
  it("is declared once after the imports, and shared by every run", () => {
    const code = transpile(
      ts,
      "host.tsx",
      [
        `import { cs } from "@backtickjs/core";`,
        `export function row(label: string) {`,
        "  return cs`<li>{$label}</li>`;",
        `}`,
      ].join("\n"),
      "@backtickjs/core",
    );
    const lines = code.split("\n");
    const declared = lines.findIndex((line) => line === "const $module0 = {");
    assert.ok(declared > lines.findIndex((line) => line.startsWith("import ")));
    assert.ok(
      declared <
        lines.findIndex((line) => line.startsWith("export function row")),
    );
    assert.match(
      code,
      /return cs\.create\(\$module0, \[\{ kind: "splice", value: label, bindings: \[\] \}\]\);/,
    );
  });
});
