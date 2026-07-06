import assert from "node:assert";
import { describe, it } from "node:test";
import ts from "typescript";
import { freeVars } from "../../dist/compiler/freeVars.js";

// Parse a script body the way compileScript does and run the free-variable
// analysis over it. Scripts are either a single expression or a block.
function captures(source: string): string[] {
  const sourceFile = ts.createSourceFile(
    "test.ts",
    source,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );
  // No binding resolution: every free identifier keeps its own text, which is
  // what these cases assert.
  const bindings = new Map();
  const [statement] = sourceFile.statements;
  if (statement && ts.isExpressionStatement(statement)) {
    return freeVars(ts, {}, statement.expression, bindings);
  }
  if (statement && ts.isBlock(statement)) {
    return freeVars(ts, {}, statement, bindings);
  }
  throw new Error("expected an expression or block script");
}

describe("freeVars", () => {
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
});
