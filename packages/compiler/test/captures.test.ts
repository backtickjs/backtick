import assert from "node:assert";
import { describe, it } from "node:test";
import {
  parseSourceText,
  type ResolvedParam,
  resolveBindings,
} from "@backtickjs/compiler";
import ts from "typescript";

// The binding keys a script's parameters capture, in order.
function capturesOf(params: readonly ResolvedParam[] = []): string[] {
  return params.flatMap((param) =>
    param.kind === "capture" ? [param.key] : [],
  );
}

// Captures of the top-level script in `body`. A top-level script has no
// enclosing script — and there are no globals — so its captures are always
// empty; the resolution behavior shows in `nested` below.
function captures(body: string): string[] {
  const source = `const script = cs\`${body}\`;`;
  const parsed = parseSourceText(ts, "test.ts", source);
  const { params } = resolveBindings(ts, parsed.scripts, "hash");
  const [script] = parsed.scripts;
  return capturesOf(params.get(script));
}

// Captures of the scripts nested in `source`'s top-level script, in source
// order: the binding keys they must receive from the enclosing scope.
function nested(source: string): string[] {
  const parsed = parseSourceText(ts, "test.ts", source);
  const { params } = resolveBindings(ts, parsed.scripts, "hash");
  const [script] = parsed.scripts;
  return Object.values(script.splices)
    .flatMap((splice) => splice.scripts)
    .flatMap((nestedScript) => capturesOf(params.get(nestedScript)));
}

describe("captures", () => {
  describe("declarations bind (with hoisting)", () => {
    it("a declared variable is not free", () => {
      assert.deepStrictEqual(captures("{ const x = 1; return x; }"), []);
    });

    it("a use before its declaration is still bound (hoisting)", () => {
      assert.deepStrictEqual(captures("{ return x; const x = 1; }"), []);
    });

    it("an unbound name is not a capture — there are no globals", () => {
      assert.deepStrictEqual(captures("{ const x = y; return x; }"), []);
    });
  });

  describe("references resolve to enclosing scripts", () => {
    it("a nested script captures the enclosing binding it reads", () => {
      assert.deepStrictEqual(
        nested("const script = cs`{ const x = 1; return ${cs`x`}; }`;"),
        ["x$hash$0"],
      );
    });

    it("an assignment target resolves to the enclosing binding", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ let x = 0; ${cs`{ x = 1; }`}; return x; }`;",
        ),
        ["x$hash$0"],
      );
    });

    it("an assignment in a nested block still resolves outward", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ let x = 0; ${cs`{ { x = 1; } }`}; return x; }`;",
        ),
        ["x$hash$0"],
      );
    });
  });

  describe("nested scopes", () => {
    it("a declaration in a closed block does not leak out", () => {
      assert.deepStrictEqual(
        nested("const script = cs`{ { const x = 1; } return ${cs`x`}; }`;"),
        [],
      );
    });

    it("an outer declaration resolves a use in a nested block", () => {
      assert.deepStrictEqual(
        nested("const script = cs`{ const x = 1; { return ${cs`x`}; } }`;"),
        ["x$hash$0"],
      );
    });

    it("an inner declaration shadows the same name", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const x = 1; { const x = 2; return ${cs`x`}; } }`;",
        ),
        ["x$hash$1"],
      );
    });
  });

  describe("control flow", () => {
    it("the condition and both branches contribute references", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const cond = true; let x = 0; " +
            "${cs`{ if (cond) { x = 1; } else { x = 2; } }`}; return x; }`;",
        ),
        ["cond$hash$0", "x$hash$1"],
      );
    });

    it("a variable the nested script declares itself is not captured", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const cond = true; " +
            "${cs`{ let x = 0; if (cond) { x = 1; } }`}; }`;",
        ),
        ["cond$hash$0"],
      );
    });

    it("a declaration inside a branch block does not leak out", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const cond = true; " +
            "${cs`{ if (cond) { const x = 1; } return x; }`}; }`;",
        ),
        ["cond$hash$0"],
      );
    });
  });

  describe("calls", () => {
    it("a callee and an argument resolve to enclosing bindings", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const foo = (a: number) => a; const x = 1; " +
            "return ${cs`foo(x)`}; }`;",
        ),
        // Counted in source order: `a` is declared between them.
        ["foo$hash$0", "x$hash$2"],
      );
    });

    it("a method receiver and argument resolve to enclosing bindings", () => {
      assert.deepStrictEqual(
        nested(
          'const script = cs`{ const s = "a"; const y = "b"; ' +
            "return ${cs`s.concat(y)`}; }`;",
        ),
        ["s$hash$0", "y$hash$1"],
      );
    });

    it("a local receiver leaves only the enclosing-bound argument", () => {
      assert.deepStrictEqual(
        nested(
          'const script = cs`{ const y = "b"; ' +
            'return ${cs`{ const s = "a"; return s.concat(y); }`}; }`;',
        ),
        ["y$hash$0"],
      );
    });
  });

  // Syntax the resolver reads as the language does, whether or not the rest
  // of the compiler accepts it yet.
  describe("any declaration binds", () => {
    it("a destructured name", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const { a, b: [c] } = { a: 1, b: [2] }; " +
            "return ${cs`a + c`}; }`;",
        ),
        ["a$hash$0", "c$hash$1"],
      );
    });

    it("a function declaration, before it is written", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const g = ${cs`f()`}; function f() { return 1; } }`;",
        ),
        ["f$hash$1"],
      );
    });

    it("a class, a `var` and a `for…of` binding", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ class C {} var v = 1; " +
            "for (const item of [1]) { ${cs`[C, v, item]`}; } }`;",
        ),
        ["C$hash$0", "v$hash$1", "item$hash$2"],
      );
    });

    it("a destructured name, not handed to a hole in its own initializer", () => {
      const source =
        "const script = cs`{ const [a, b] = ${cs`a`}; return ${cs`[a, b]`}; }`;";
      const parsed = parseSourceText(ts, "test.ts", source);
      const { params } = resolveBindings(ts, parsed.scripts, "hash");
      const [script] = parsed.scripts;
      assert.deepStrictEqual(
        params
          .get(script!)!
          .flatMap((param) =>
            param.kind === "splice" ? [param.bindings] : [],
          ),
        [[], ["a$hash$0", "b$hash$1"]],
      );
    });

    it("a catch binding, in its handler only", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ try {} catch (error) { ${cs`error`}; } " +
            "${cs`error`}; }`;",
        ),
        ["error$hash$0"],
      );
    });

    it("a value a `typeof` or a class's `extends` reads, in a type", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const a = { n: 1 }; class Base {} " +
            "${cs`{ const b: typeof a = { n: 2 }; class C extends Base {} return [b, C]; }`}; }`;",
        ),
        ["a$hash$0", "Base$hash$1"],
      );
    });

    it("a name only a type spells binds nothing", () => {
      assert.deepStrictEqual(
        nested(
          "const script = cs`{ const n = 1; " +
            "${cs`((f: (n: string) => void) => n)`}; }`;",
        ),
        ["n$hash$0"],
      );
    });
  });
});
