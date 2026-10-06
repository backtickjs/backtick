import clientScript from "@backtickjs/vscode-extension/syntaxes/client-script.injection.json" with { type: "json" };
import splice from "@backtickjs/vscode-extension/syntaxes/splice.injection.json" with { type: "json" };
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  createHighlighter,
  type LanguageRegistration,
  type ThemedToken,
} from "shiki";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Token = { text: string; color: string };
export type Line = { tokens: Token[]; added: boolean };

// VS Code's default dark theme, with its bracket pair colours: code here
// looks the way it does in the editor.
const THEME = "dark-plus";

// The editor extension's own grammars, so a `cs` template reads here the way
// it does in VS Code: its body as TSX, its splices as splices.
const highlighter = await createHighlighter({
  themes: [THEME],
  langs: [
    "tsx",
    "json",
    "bash",
    "hack",
    {
      ...clientScript,
      name: "client-script",
      injectTo: ["source.tsx"],
    } as unknown as LanguageRegistration,
    {
      ...splice,
      name: "splice",
      injectTo: ["source.tsx"],
    } as unknown as LanguageRegistration,
  ],
});

// Coloured here, while bundling, so the browser gets spans and no highlighter.
// A line written with a leading `+` is marked added, and loses the `+`.
export async function highlight(
  source: string,
  lang: "tsx" | "json" | "bash" | "hack",
): Promise<Line[]> {
  const written = source.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const code = written.map((line) => line.replace(/^\+/, "")).join("\n");

  // Transformers run only on the way to HTML, so the last one keeps the
  // tokens the bracket colouring leaves behind.
  let tokens: ThemedToken[][] = [];
  highlighter.codeToHast(code, {
    lang,
    theme: THEME,
    transformers: [
      transformerColorizedBrackets(),
      {
        tokens(colored) {
          tokens = colored;
        },
      },
    ],
  });

  const fg = highlighter.getTheme(THEME).fg;
  return tokens.map((line, index) => ({
    added: written[index]!.startsWith("+"),
    tokens: line.map((token) => ({
      text: token.content,
      color: token.color ?? fg,
    })),
  }));
}
