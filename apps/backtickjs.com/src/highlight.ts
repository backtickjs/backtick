import { codeToTokens } from "shiki";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Token = { text: string; color: string };
export type Line = { tokens: Token[]; added: boolean };

const THEME = "github-dark-default";

// Coloured here, while bundling, so the browser gets spans and no highlighter.
// A line written with a leading `+` is marked added, and loses the `+`.
export async function highlight(
  source: string,
  lang: "tsx" | "json" | "bash",
): Promise<Line[]> {
  const written = source.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const code = written.map((line) => line.replace(/^\+/, "")).join("\n");
  const { tokens, fg } = await codeToTokens(code, { lang, theme: THEME });
  return tokens.map((line, index) => ({
    added: written[index]!.startsWith("+"),
    tokens: line.map((token) => ({
      text: token.content,
      color: token.color ?? fg ?? "#e6edf3",
    })),
  }));
}
