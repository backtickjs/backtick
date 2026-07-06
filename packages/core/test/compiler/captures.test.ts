import assert from "node:assert";
import { describe, it } from "node:test";
import ts from "typescript";
import { parseFile } from "../../dist/compiler/parseFile.js";
import { resolveBindings } from "../../dist/compiler/resolveBindings.js";

function captures(body: string): string[] {
  const source = `const script = cs\`${body}\`;`;
  const parsed = parseFile(ts, "test.ts", source);
  const { captures } = resolveBindings(ts, parsed.scripts, "test.ts");
  const [script] = parsed.scripts;
  return captures.get(script) ?? [];
}

describe("captures", () => {
  describe("declarations bind (with hoisting)", () => {
    it("a declared variable is not free", () => {
      assert.deepStrictEqual(captures("{ const x = 1; return x; }"), []);
    });

    it("a use before its declaration is still bound (hoisting)", () => {
      assert.deepStrictEqual(captures("{ return x; const x = 1; }"), []);
    });

    it("a free initializer is captured", () => {
      assert.deepStrictEqual(captures("{ const x = y; return x; }"), ["y"]);
    });
  });

  describe("assignments do not bind", () => {
    it("an assignment to an undeclared variable is free", () => {
      assert.deepStrictEqual(captures("{ x = 1; return x; }"), ["x"]);
    });

    it("a read of an undeclared variable is free", () => {
      assert.deepStrictEqual(captures("{ return x; x = 1; }"), ["x"]);
    });

    it("an undeclared assignment in a nested block is free", () => {
      assert.deepStrictEqual(captures("{ { x = 1; } return x; }"), ["x"]);
    });
  });

  describe("nested scopes", () => {
    it("a declaration in a nested block does not leak out", () => {
      assert.deepStrictEqual(captures("{ { const x = 1; } return x; }"), ["x"]);
    });

    it("an outer declaration resolves a use in a nested block", () => {
      assert.deepStrictEqual(captures("{ const x = 1; { return x; } }"), []);
    });

    it("an inner declaration shadows the same name", () => {
      assert.deepStrictEqual(
        captures("{ const x = 1; { const x = 2; return x; } }"),
        [],
      );
    });
  });

  describe("control flow", () => {
    it("the condition and both branches contribute references", () => {
      assert.deepStrictEqual(
        captures("{ if (cond) { x = 1; } else { x = 2; } return x; }"),
        ["cond", "x"],
      );
    });

    it("a declared variable reassigned in a branch is not free", () => {
      assert.deepStrictEqual(
        captures("{ let x = 0; if (cond) { x = 1; } return x; }"),
        ["cond"],
      );
    });

    it("a declaration inside a branch block does not leak out", () => {
      assert.deepStrictEqual(
        captures("{ if (cond) { const x = 1; } return x; }"),
        ["cond", "x"],
      );
    });
  });

  describe("calls", () => {
    it("a free callee and a free argument are both captured", () => {
      assert.deepStrictEqual(captures("{ return foo(x); }"), ["foo", "x"]);
    });

    it("a free method receiver and argument are captured", () => {
      assert.deepStrictEqual(captures("{ return s.concat(y); }"), ["s", "y"]);
    });

    it("a local receiver leaves only the free argument", () => {
      assert.deepStrictEqual(captures("{ const s = 1; return s.concat(y); }"), [
        "y",
      ]);
    });
  });
});
