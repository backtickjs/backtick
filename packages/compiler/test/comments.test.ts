import assert from "node:assert";
import { describe, it } from "node:test";
import { virtualize } from "@backtickjs/compiler";
import ts from "typescript";

// The comments a script writes, carried into the virtual code the checker
// reads, so a `@ts-expect-error` or `@ts-ignore` works there.
// A directive covers the line after it, so it has to land directly above the
// rewritten statement.

// The virtual code of one script.
function virtual(body: string) {
  const source = `import { cs } from "@backtickjs/core";\nconst script = cs\`${body}\`;\n`;
  return virtualize(ts, "test.tsx", source);
}

// The virtual line holding `text`, and the first line after it that is not
// blank.
function linesAround(code: string, text: string): [string, string] {
  const lines = code.split("\n");
  const at = lines.findIndex((line) => line.includes(text));
  assert.notStrictEqual(at, -1, `no line holds ${text}`);
  const next = lines.slice(at + 1).find((line) => line.trim() !== "");
  return [lines[at]!.trim(), next!.trim()];
}

describe("a comment above a statement in a script", () => {
  it("lands directly above the statement it was written above", () => {
    const { virtualCode } = virtual(`{
      const coins = { x: 1 };
      // @ts-expect-error: an object is read by a string
      return coins[0];
    }`);
    const [directive, next] = linesAround(virtualCode, "@ts-expect-error");
    assert.strictEqual(
      directive,
      "// @ts-expect-error: an object is read by a string",
    );
    assert.match(next, /^return /);
  });

  it("carries `@ts-ignore` too", () => {
    const { virtualCode } = virtual(`{
      // @ts-ignore
      return 1;
    }`);
    assert.match(virtualCode, /\/\/ @ts-ignore\n/);
  });

  it("carries the other comments above a statement as written", () => {
    const { virtualCode } = virtual(`{
      // a note
      /* a block comment */
      return 1;
    }`);
    const [note] = linesAround(virtualCode, "// a note");
    const [block, next] = linesAround(virtualCode, "/* a block comment */");
    assert.strictEqual(note, "// a note");
    assert.strictEqual(block, "/* a block comment */");
    assert.match(next, /^return /);
  });

  it("keeps a comment inside an expression, in parentheses or a JSX child", () => {
    const { virtualCode } = virtual(`{
      const total = 1;
      return (
        // above an element
        <div>{/* in a child */ total}</div>
      );
    }`);
    assert.match(virtualCode, /\/\/ above an element\n\s*<div>/);
    assert.match(
      virtualCode,
      /\{cs\.lift\(\/\* in a child \*\/ __cs_total\)\}/,
    );
  });
});
