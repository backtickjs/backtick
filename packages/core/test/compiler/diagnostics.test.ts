import assert from "node:assert";
import { describe, it } from "node:test";
import ts from "typescript";
import { virtualize } from "../../dist/compiler/virtualize.js";

function diagnose(source: string) {
  return virtualize(ts, "test.ts", source).diagnostics;
}

describe("diagnostics", () => {
  it("reports unsupported syntax inside a `cs` script", () => {
    const source = "const x = cs`foo()`;";
    const diagnostics = diagnose(source);

    assert.strictEqual(diagnostics.length, 1);
    const [diagnostic] = diagnostics;
    assert.match(diagnostic.message, /isn't supported/);

    // The range points at the offending node in the original source.
    assert.strictEqual(
      source.slice(diagnostic.range.start, diagnostic.range.end),
      "foo()",
    );
  });

  it("reports unsupported object properties", () => {
    const diagnostics = diagnose("const x = cs`({ a })`;");

    assert.strictEqual(diagnostics.length, 1);
    assert.match(diagnostics[0].message, /object property/);
  });

  it("produces no diagnostics for supported syntax", () => {
    assert.deepStrictEqual(diagnose("const x = cs`1 + 2`;"), []);
  });

  it("has no diagnostics when there are no `cs` scripts", () => {
    assert.deepStrictEqual(diagnose("const x = foo();"), []);
  });
});
