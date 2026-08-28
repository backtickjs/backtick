/**
 * Colouring the editor.
 *
 * The two rules that are Backtick's own are the repo's own: where a `cs`
 * template begins, and what a splice looks like inside one. Both are ported from
 * `language-tools/vscode-extension/syntaxes`, which is where an editor reads
 * them — the same regexes, so the page and the editor disagree about nothing.
 *
 * What is *not* ported is everything those two files inject into. A TextMate
 * injection is half a grammar; the other half is `source.tsx`, ten thousand
 * lines that ship with VS Code and want an oniguruma engine to run them. The
 * rest of the colouring here is a scanner instead, and it is approximate by
 * design: the compiler's opinion reaches the reader as a complaint with an exact
 * span, and this only has to make code look like code while they type.
 *
 * A complete partition of the text — every character in exactly one token — so
 * what is painted has no seams in it.
 */
export type Ink =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "type"
  | "number"
  | "splice"
  | "tag"
  | "attribute"
  | "tagged";

export interface Token {
  readonly at: number;
  readonly to: number;
  readonly ink: Ink;
}

const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "keyof",
  "let",
  "new",
  "null",
  "of",
  "readonly",
  "return",
  "satisfies",
  "static",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
]);

// Written apart from the keywords because they read apart: these are names a
// type position holds, and colouring them alike loses the one distinction a
// reader of this language most needs to see.
const TYPES = new Set([
  "any",
  "bigint",
  "boolean",
  "never",
  "number",
  "object",
  "string",
  "symbol",
  "unknown",
]);

const WORD = /[A-Za-z0-9_$]/;

function isWord(char: string | undefined): boolean {
  return char !== undefined && WORD.test(char);
}

export function highlight(text: string): readonly Token[] {
  const tokens: Token[] = [];
  // How many `cs` templates we are inside, and the `${` nesting in each — so a
  // splice holding a template of its own does not end the script early.
  const scripts: number[] = [];
  // The tags being written, and the `{` nesting inside each: an attribute is a
  // name in a tag, and inside a tag's braces we are reading an expression again.
  const tags: number[] = [];
  let at = 0;
  let plain = 0;

  const flush = (to: number): void => {
    if (to > plain) {
      tokens.push({ at: plain, to, ink: "plain" });
    }
  };
  const take = (to: number, ink: Ink): void => {
    flush(at);
    tokens.push({ at, to, ink });
    at = to;
    plain = to;
  };
  const inScript = (): boolean => scripts.length > 0;
  const inTag = (): boolean => tags.length > 0 && tags[tags.length - 1] === 0;

  const wordEnd = (from: number): number => {
    let end = from;
    while (end < text.length && isWord(text[end])) {
      end++;
    }
    return end;
  };

  while (at < text.length) {
    const char = text[at]!;
    const next = text[at + 1];

    if (char === "/" && next === "/") {
      const end = text.indexOf("\n", at);
      take(end === -1 ? text.length : end, "comment");
      continue;
    }
    if (char === "/" && next === "*") {
      const end = text.indexOf("*/", at + 2);
      take(end === -1 ? text.length : end + 2, "comment");
      continue;
    }
    if (char === '"' || char === "'") {
      take(closingQuote(text, at, char), "string");
      continue;
    }

    // `(?<![$_[:alnum:]])(cs)(\`)` — the injection's own gate, written without a
    // lookbehind because the character before is right here to read. Coloured as
    // the grammar scopes it, `entity.name.function.tagged-template`, and it is
    // the marker for where the half that ships begins.
    if (
      char === "c" &&
      next === "s" &&
      text[at + 2] === "`" &&
      !isWord(text[at - 1])
    ) {
      take(at + 3, "tagged");
      scripts.push(0);
      continue;
    }

    if (char === "`") {
      if (inScript() && scripts[scripts.length - 1] === 0) {
        take(at + 1, "tagged");
        scripts.pop();
        continue;
      }
      // A template the server wrote, stepped over whole: what is in one is not a
      // script, and nothing in this file has an opinion about it.
      take(closingBacktick(text, at), "string");
      continue;
    }

    if (inScript()) {
      // `\$\{` and `(?<![_$[:alnum:]])(\$)([_[:alpha:]][_$[:alnum:]]*)` — both
      // splice forms, scoped alike, as `splice.injection.json` scopes them.
      if (char === "$" && next === "{") {
        take(at + 2, "splice");
        scripts[scripts.length - 1]!++;
        continue;
      }
      if (char === "$" && isWord(next) && !isWord(text[at - 1])) {
        take(wordEnd(at + 1), "splice");
        continue;
      }
    }

    // A closing tag, which is one token: `</p`, then the `>` below ends it.
    if (char === "<" && next === "/" && isWord(text[at + 2])) {
      take(nameEnd(text, at + 2), "tag");
      tags.push(0);
      continue;
    }
    // An opening tag. Loose on purpose, exactly as the base grammar is: `a < b`
    // with no space matches one, and so does this.
    if (char === "<" && isWord(next)) {
      take(nameEnd(text, at + 1), "tag");
      tags.push(0);
      continue;
    }

    if (inTag()) {
      if (char === ">" || (char === "/" && next === ">")) {
        take(char === ">" ? at + 1 : at + 2, "tag");
        tags.pop();
        continue;
      }
      // A name in a tag and outside its braces is an attribute, which is the
      // only place this language puts one.
      if (isWord(char) && !isWord(text[at - 1]) && !/[0-9]/.test(char)) {
        take(wordEnd(at), "attribute");
        continue;
      }
    }

    if (char === "{" && tags.length > 0) {
      tags[tags.length - 1]!++;
      at++;
      continue;
    }
    if (char === "}" && tags.length > 0 && tags[tags.length - 1]! > 0) {
      tags[tags.length - 1]!--;
      at++;
      continue;
    }
    if (char === "}" && inScript() && scripts[scripts.length - 1]! > 0) {
      take(at + 1, "splice");
      scripts[scripts.length - 1]!--;
      continue;
    }

    if (char >= "0" && char <= "9" && !isWord(text[at - 1])) {
      let end = at;
      while (end < text.length && /[0-9._exXbo]/.test(text[end]!)) {
        end++;
      }
      take(end, "number");
      continue;
    }

    if (isWord(char) && !isWord(text[at - 1])) {
      const end = wordEnd(at);
      const word = text.slice(at, end);
      if (KEYWORDS.has(word)) {
        take(end, "keyword");
      } else if (TYPES.has(word)) {
        take(end, "type");
      } else {
        at = end;
      }
      continue;
    }

    at++;
  }

  flush(text.length);
  return tokens;
}

/** Past a tag's name, which may be dotted — `<Foo.Bar` is one name. */
function nameEnd(text: string, from: number): number {
  let end = from;
  while (end < text.length && (isWord(text[end]) || text[end] === ".")) {
    end++;
  }
  return end;
}

function closingQuote(text: string, at: number, quote: string): number {
  let end = at + 1;
  while (end < text.length) {
    const char = text[end];
    if (char === "\\") {
      end += 2;
      continue;
    }
    if (char === quote || char === "\n") {
      return end + 1;
    }
    end++;
  }
  return text.length;
}

function closingBacktick(text: string, at: number): number {
  let end = at + 1;
  while (end < text.length) {
    if (text[end] === "\\") {
      end += 2;
      continue;
    }
    if (text[end] === "`") {
      return end + 1;
    }
    end++;
  }
  return text.length;
}
