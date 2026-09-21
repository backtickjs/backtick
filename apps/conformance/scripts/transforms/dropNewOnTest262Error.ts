import ts from "typescript";
import type { Edit } from "./Edit.js";
import { tokenize } from "./tokenize.js";

/**
 * Rewrites `new Test262Error(…)` as `Test262Error(…)`.
 *
 * Why: a case throws `new Test262Error(message)` to fail, and client script
 * has no `new`. What the error is made of is the harness's business, not what
 * the case tests, so the harness's `Test262Error` is a function answering the
 * text a verdict shows, and the case calls it.
 */
export function dropNewOnTest262Error(source: string): Edit[] {
  const { tokens } = tokenize(source);
  const edits: Edit[] = [];
  tokens.forEach((token, i) => {
    const next = tokens[i + 1];
    if (
      token.kind === ts.SyntaxKind.NewKeyword &&
      next?.text === "Test262Error"
    ) {
      edits.push({ start: token.start, end: next.start, text: "" });
    }
  });
  return edits;
}
