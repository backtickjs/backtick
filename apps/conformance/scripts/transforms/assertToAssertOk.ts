import ts from "typescript";
import type { Edit } from "./Edit.js";
import { tokenize } from "./tokenize.js";

/**
 * Rewrites a call of `assert(…)` as `assert.ok(…)`.
 *
 * Why: Test262's `assert` is a function that also has members —
 * `assert(value)` and `assert.sameValue(a, b)` — and client script can't make
 * a value that is both. The harness's `assert` is an object, and `ok` is the
 * call the bare form stands for. A member call, `assert.sameValue(…)`, is left
 * alone.
 */
export function assertToAssertOk(source: string): Edit[] {
  const { tokens } = tokenize(source);
  const edits: Edit[] = [];
  tokens.forEach((token, i) => {
    if (
      token.text === "assert" &&
      tokens[i + 1]?.kind === ts.SyntaxKind.OpenParenToken &&
      tokens[i - 1]?.kind !== ts.SyntaxKind.DotToken
    ) {
      edits.push({ start: token.end, end: token.end, text: ".ok" });
    }
  });
  return edits;
}
