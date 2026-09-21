import ts from "typescript";
import type { Edit } from "./Edit.js";
import { tokenize } from "./tokenize.js";

/**
 * Removes a comment that holds a backtick or `${`, keeping its line breaks.
 *
 * Why: a case reaches the compiler as the body of a `cs` template, which the
 * first backtick ends and `${` splices into — even inside a comment. Escaping
 * doesn't help, since the compiler would then read the backslash as source.
 * Test262 prose often quotes code in backticks, the frontmatter included.
 *
 * Every other comment stays as written, because some cases are about comments,
 * and an unclosed one is never removed: it is the syntax error such a case
 * expects. Line breaks stay so that a refusal points at the case's own line.
 */
export function dropBacktickComments(source: string): Edit[] {
  return tokenize(source)
    .comments.filter(
      (comment) =>
        /`|\$\{/.test(comment.text) &&
        (comment.kind === ts.SyntaxKind.SingleLineCommentTrivia ||
          // At least `/**/`: `/*/` ends in `*/` and is still open.
          (comment.text.length >= 4 && comment.text.endsWith("*/"))),
    )
    .map((comment) => ({
      start: comment.start,
      end: comment.end,
      text: comment.text.replace(/[^\n]/g, ""),
    }));
}
