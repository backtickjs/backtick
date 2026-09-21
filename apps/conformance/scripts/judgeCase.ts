import { transpile } from "@backtickjs/compiler";
import ts from "typescript";
import YAML from "yaml";

type Outcome = "pass" | "fail" | "unsupported";

/**
 * What the host makes of a case: a verdict it reached itself, or the client
 * script it compiled to. A script is the client's to run once the type checker
 * accepts it; `early` names the error ECMAScript rejects it with before
 * running, so a script that has one is refused rather than run.
 */
export type Judgement =
  | { verdict: { outcome: Outcome; detail: string } }
  | { script: string; negative: boolean; early: string | null };

/** The frontmatter keys a host has to act on. The rest is prose. */
interface Meta {
  flags?: string[];
  includes?: string[];
  negative?: { phase: "parse" | "resolution" | "runtime"; type: string };
}

// The includes the harness answers for; a case needing another is unsupported.
const HARNESS = ["compareArray.js"];

/**
 * A Test262 case, judged as the client script it is written as: a refusal is
 * the host's answer, and a script is the client's to run.
 *
 * Nothing about the case is changed except how it reaches the harness: see
 * `adapt`.
 */
export function judgeCase(name: string, source: string): Judgement {
  const meta = frontmatter(source);
  const flags = meta.flags ?? [];
  const unsupported = (detail: string): Judgement => ({
    verdict: { outcome: "unsupported", detail },
  });

  if (flags.includes("module")) {
    return unsupported("is a module, and a client script is not one");
  }
  if (flags.includes("async")) {
    return unsupported("finishes through `$DONE`, which needs promises");
  }
  const missing = (meta.includes ?? []).find((i) => !HARNESS.includes(i));
  if (missing !== undefined) {
    return unsupported(`needs the harness's ${missing}`);
  }
  const raw = flags.includes("raw");
  const script = adapt(source, !raw);
  // Not a refusal of the case: a `cs` template ends at its first backtick.
  if (script.includes("`") || script.includes("${")) {
    return unsupported("holds a backtick, which a `cs` template cannot");
  }

  const prefix = raw
    ? ""
    : "const assert = $assert;\nconst Test262Error = $Test262Error;\n" +
      (meta.includes?.includes("compareArray.js")
        ? "const compareArray = $compareArray;\n"
        : "");
  const block = `{\n${prefix}${script}\n}`;
  // Compiled as a module of its own only to hear what the compiler refuses.
  const module =
    'import { cs } from "@backtickjs/core";\n' +
    `export default cs\`${block}\`;\n`;

  // A case ECMAScript rejects before running passes by being refused.
  const early =
    meta.negative?.phase === "parse" || meta.negative?.phase === "resolution";

  let refusal = syntaxError(name, block);
  if (refusal === null) {
    const errors: ts.Diagnostic[] = [];
    try {
      transpile(
        ts,
        `${name}.ts`,
        module,
        "@backtickjs/ui-platform-sdk",
        (diagnostic) => {
          if (diagnostic.category === ts.DiagnosticCategory.Error) {
            errors.push(diagnostic);
          }
        },
      );
    } catch (error) {
      // The compiler's fault, not the case's: it should have said why instead.
      return unsupported(`crashed the compiler: ${(error as Error).message}`);
    }
    // Every kind of refusal, since the first is not always the one that
    // explains it: each once, at its first line.
    const first = new Map<string, ts.Diagnostic>();
    for (const error of errors) {
      const message = ts.flattenDiagnosticMessageText(error.messageText, " ");
      if (!first.has(message)) first.set(message, error);
    }
    refusal = first.size
      ? [...first.values()].map((error) => describe(error, module)).join("; ")
      : null;
  }

  if (refusal !== null) {
    return early
      ? { verdict: { outcome: "pass", detail: "" } }
      : unsupported(refusal);
  }
  return {
    script: block,
    negative: meta.negative?.phase === "runtime",
    early: early ? meta.negative!.type : null,
  };
}

function frontmatter(source: string): Meta {
  const block = /\/\*---([\s\S]*?)---\*\//.exec(source);
  // `yaml`, not `Bun.YAML`: Bun refuses a `[` inside a plain scalar. Line
  // breaks made `\n`, since `yaml` misses a lone `\r`, and a case about line
  // terminators writes its frontmatter in the one it is about.
  return block ? (YAML.parse(block[1]!.replace(/\r\n?/g, "\n")) as Meta) : {};
}

interface Token {
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
function tokenize(source: string): { tokens: Token[]; comments: Token[] } {
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

/**
 * The case as its script, and nothing else changed but how it reaches the
 * harness. A comment goes, lines kept, only where it holds what a `cs`
 * template can't — a backtick or `${` — and only once closed: an unclosed one
 * is what some cases test. And the two places a case reaches its harness in a way
 * client script cannot: `assert(…)` becomes `assert.ok(…)`, and
 * `new Test262Error(…)` loses its `new`.
 */
function adapt(source: string, harnessed: boolean): string {
  const { tokens, comments } = tokenize(source);
  const edits: { start: number; end: number; text: string }[] = comments
    .filter(
      (comment) =>
        /`|\$\{/.test(comment.text) &&
        (comment.kind === ts.SyntaxKind.SingleLineCommentTrivia ||
          // At least `/**/`: `/*/` ends in `*/` and is still open.
          (comment.text.length >= 4 && comment.text.endsWith("*/"))),
    )
    .map((comment) => ({
      ...comment,
      text: comment.text.replace(/[^\n]/g, ""),
    }));
  tokens.forEach((token, i) => {
    if (!harnessed) return;
    const next = tokens[i + 1];
    if (
      token.text === "assert" &&
      next?.kind === ts.SyntaxKind.OpenParenToken &&
      tokens[i - 1]?.kind !== ts.SyntaxKind.DotToken
    ) {
      edits.push({ start: token.end, end: token.end, text: ".ok" });
    } else if (
      token.kind === ts.SyntaxKind.NewKeyword &&
      next?.text === "Test262Error"
    ) {
      edits.push({ start: token.start, end: next.start, text: "" });
    }
  });
  edits.sort((a, b) => a.start - b.start);
  let adapted = "";
  let from = 0;
  for (const edit of edits) {
    adapted += source.slice(from, edit.start) + edit.text;
    from = edit.end;
  }
  return adapted + source.slice(from);
}

/**
 * What the parser refuses, which the transform does not report and
 * `backtick-tsc` does: checked on the script alone, where offsets are its own.
 */
function syntaxError(name: string, script: string): string | null {
  // A program of one file, asked only for syntax: nothing is emitted, since
  // TypeScript's emitter crashes on some of what Test262 writes.
  const fileName = `${name}.js`;
  const file = ts.createSourceFile(fileName, script, ts.ScriptTarget.ESNext);
  const program = ts.createProgram({
    rootNames: [fileName],
    options: { allowJs: true, noLib: true, noResolve: true },
    host: {
      ...ts.createCompilerHost({}),
      getSourceFile: (asked) => (asked === fileName ? file : undefined),
      fileExists: (asked) => asked === fileName,
    },
  });
  const [first] = program.getSyntacticDiagnostics(file);
  return first ? describe(first, script) : null;
}

// The compiler's message, and the line of the case it is about. ASCII only:
// `@backtickjs/bun-plugin` garbles anything else in a file it rewrites.
function describe(error: ts.Diagnostic, module: string): string {
  const message = ts.flattenDiagnosticMessageText(error.messageText, " ");
  if (error.start === undefined) return message;
  const lineStart = module.lastIndexOf("\n", error.start) + 1;
  const lineEnd = module.indexOf("\n", error.start);
  return `${message}: ${module.slice(lineStart, lineEnd).trim()}`;
}
