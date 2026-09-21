import ts from "typescript";

export interface Token {
  kind: ts.SyntaxKind;
  start: number;
  end: number;
  text: string;
}

// After these a `/` divides; anywhere else it starts a regular expression.
const OPERANDS = new Set([
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.CloseParenToken,
  ts.SyntaxKind.CloseBracketToken,
  ts.SyntaxKind.CloseBraceToken,
  ts.SyntaxKind.ThisKeyword,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NullKeyword,
]);

/** The source's tokens, and its comments apart from them. */
export function tokenize(source: string): {
  tokens: Token[];
  comments: Token[];
} {
  const scanner = ts.createScanner(ts.ScriptTarget.ESNext, false);
  scanner.setText(source);
  const tokens: Token[] = [];
  const comments: Token[] = [];
  for (
    let kind = scanner.scan();
    kind !== ts.SyntaxKind.EndOfFileToken;
    kind = scanner.scan()
  ) {
    if (
      (kind === ts.SyntaxKind.SlashToken ||
        kind === ts.SyntaxKind.SlashEqualsToken) &&
      !OPERANDS.has(tokens.at(-1)?.kind ?? ts.SyntaxKind.Unknown)
    ) {
      kind = scanner.reScanSlashToken();
    }
    const token = {
      kind,
      start: scanner.getTokenStart(),
      end: scanner.getTokenEnd(),
      text: scanner.getTokenText(),
    };
    if (
      kind === ts.SyntaxKind.SingleLineCommentTrivia ||
      kind === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      comments.push(token);
    } else if (
      kind !== ts.SyntaxKind.WhitespaceTrivia &&
      kind !== ts.SyntaxKind.NewLineTrivia
    ) {
      tokens.push(token);
    }
  }
  return { tokens, comments };
}
